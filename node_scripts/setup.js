const fs = require("fs");
const AWS = require("aws-sdk");

const { argParse, run, getInput } = require("./helpers");
const { config } = require("../setup_config");
const createIssuers = require("./create_issuers");

async function prerequisites() {
  console.log("Before you proceed:\n");
  console.log("    - save valid AWS credentials in ~/.aws/credentials.",
    "The [default] profile will be used for the setup."
  );
  console.log("    - change setup_config.js to suit your application\n");
  await getInput(" [Ctrl-C] to cancel; To continue with the setup, press [Enter]");
  console.log();
}

async function getKeyId() {
  const getKeys = async () => {
    const kms = new AWS.KMS({ region: config.region });
    return new Promise((resolve, reject) => {
      kms.listKeys({}, function(err, data) {
        if(err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(data.Keys);
      });
    });
  };
  const getUser = async () => {
    const sts = new AWS.STS();
    return sts.getCallerIdentity().promise();
  };
  const createKey = async () => {
    const kms = new AWS.KMS({ region: config.region });
    const user = await getUser();
    const KeyPolicy = {
      Version: "2012-10-17",
      Id: "uportlandia-key-policy",
      Statement: [{
        Sid: "Allow administration of the key",
        Effect: "Allow",
        Principal: {
          AWS: [
            user.Arn,
            `arn:aws:iam::${user.Account}:root`
          ]
        },
        Action: "kms:*",
        Resource: "*"
      }]
    };
    const params = {
      Description: "uPortlandia KMS key",
      KeyUsage: "ENCRYPT_DECRYPT",
      Origin: "AWS_KMS",
      Policy: JSON.stringify(KeyPolicy)
    };
    return kms.createKey(params).promise();
  };

  let keys = await getKeys();
  let selectedKey;
  if(!keys || !keys.length) {
    console.log("No KMS keys found. Creating one...");
    const newKey = await createKey();
    selectedKey = {
      KeyId: newKey.KeyMetadata.KeyId,
      KeyArn: newKey.KeyMetadata.Arn
    };
  } else {
    console.table(keys);
    console.log();
  }
  if(!selectedKey) {
    const useExisting = await getInput("Do you want to use an [E]xisting key of create a [n]ew one? ");
    if(useExisting === "n" || useExisting === "N") {
      console.log("Creating a new KMS key...");
      const newKey = await createKey();
      selectedKey = {
        KeyId: newKey.KeyMetadata.KeyId,
        KeyArn: newKey.KeyMetadata.Arn
      };
      console.table(newKey);
    }
  }
  while(!selectedKey) {
    const index = await getInput("Enter the index of the Key you want to use: ");
    selectedKey = keys[index];
    if(!selectedKey) {
      console.error("Invalid index. Try again");
      continue;
    }
    console.log("You selected: ");
    console.table([ keys[index] ])
    const confirm = await getInput("Proceed? [Y]es/[n]o: ");
    if(confirm === "n" || confirm === "N") {
      selectedKey = null;
      continue;
    }
  }
  return selectedKey.KeyId;
}

async function putParameter(name, value, keyId) {
  const ssm = new AWS.SSM({ region: config.region });
  const param = {
    Name: name,
    Type: "SecureString",
    Value: value,
    KeyId: keyId,
    Overwrite: true,
    Tier: "Standard"
  };
  return new Promise((resolve, reject) => {
    ssm.putParameter(param, (err, data) => {
      if(err) {
        console.log(err, err.stack)
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });
}

async function getParameter(name, keyId) {
  const ssm = new AWS.SSM({ region: config.region });
  return new Promise((resolve, reject) => {
    ssm.getParameter({ Name: name, WithDecryption: true }, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function saveIssuerSecrets(env) {
  const paramName = config.ssmParam.issuers.replace("${opt:stage}", env)
  const keyId = await getKeyId();
  // Check if issuer secrets exist
  let existingVal;
  try {
    existingVal = (await getParameter(paramName, keyId)).Parameter.Value;
    existingVal = JSON.parse(existingVal);
    console.log(`${paramName} is currently set to: `);
    console.table(existingVal);
    const overwrite = await getInput("Warning: Recreating Issuers will change the DIDs. [r]ecreate / [S]kip: ");
    if(overwrite === "r" || overwrite === "R")
      existingVal = null;
  } catch(ex) {}

  if(existingVal) {
    console.log("Skipped issuer creation");
    return;
  }
  // Create issuer apps
  const issuerData = await createIssuers();
  console.log("Issuers created: ");
  console.table(issuerData);
  await getInput("[Ctrl-C] to cancel. To save this to SSM, press [Enter]");

  // Save secrets to SSM
  await putParameter(
    paramName,
    JSON.stringify(issuerData),
    keyId
  );
}

async function saveSignerUrl(env) {
  let { ServiceEndpoint } = require("../stack.json");
  if(!ServiceEndpoint.endsWith("/"))
    ServiceEndpoint = `${ServiceEndpoint}/`;
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `src/constants/signer.${env}.js`,
      `// Do not edit\nexport default "${ServiceEndpoint}";\n`,
      err => {
        if(err) {
          reject(err);
        } else {
          console.log(`signer.${env}.js created`);
          resolve();
        }
      }
    );
  });
}

async function createS3Bucket(name) {
  const s3 = new AWS.S3({ region: config.region });
  // Check if bucket exists
  try {
    await s3.headBucket({ Bucket: name }).promise();
    console.log(`Skipping bucket creation. Bucket ${name} already exists`)
    return;
  } catch (ex) {}
  const bucketParams = {
    Bucket : name,
    ACL : "public-read"
  };
  const staticHostParams = {
    Bucket: name,
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: "index.html"
      },
      IndexDocument: {
        Suffix: "index.html"
      }
    }
  };
  return new Promise((resolve, reject) => {
    s3.createBucket(bucketParams, function(err, data) {
      if(err) {
        console.log("Error", err);
        reject(err);
      } else {
        s3.putBucketWebsite(staticHostParams, function(err, data) {
          if(err) {
            console.log("Error", err);
            reject(err);
          } else {
            console.log("S3 Bucket created", data);
            resolve(data);
          }
        });
      }
    });
  });
}

async function slsDeploy(env) {
  return run("yarn", [ "deploy:api", "--env", env ]);
}

async function deployStatic(env) {
  return run("yarn", [ "deploy:static", "--env", env]);
}

async function setup() {
  const args = argParse();

  // Prerequisites
  await prerequisites();

  // Save issuer secrets in SSM
  await saveIssuerSecrets(args.env);

  // Deploy Lambda
  await slsDeploy(args.env);

  // Save Signer Url
  saveSignerUrl(args.env);

  // Create S3 Bucket for static assets
  await createS3Bucket(config.s3Bucket[args.env]);

  // Deploy Static site
  await deployStatic(args.env);

  console.log(`Your bucket URL is:\n\nhttp://${config.s3Bucket[args.env]}.s3-website.${config.region}.amazonaws.com/\n`);
  console.log(`You are all set! To build and deploy the static site run\n\nyarn deploy:${args.env}\n`);
}

setup();
