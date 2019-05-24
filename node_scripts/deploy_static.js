const fs = require("fs");
const { argParse, run } = require("./helpers");
const { config } = require("../setup_config");

const didTemplate = url =>
`{
  "@context": "https://w3id.org/did/v1",
  "id": "did:https:${url}",
  "publicKey": [{
    "id": "did:https:${url}",
    "type": "Secp256k1VerificationKey2018",
    "owner": "did:https:${url}",
    "ethereumAddress": "0x89f497ac4780f9946920515e8ecdcf7b970b558a"
  }],
  "authentication": [{
    "type": "Secp256k1SignatureAuthentication2018",
    "publicKey": "did:https:${url}#owner"
  }]
}
`;

async function createDid(env) {
  const url = config.domain[env];
  return new Promise((resolve, reject) => {
    if(!url) {
      resolve();
      return;
    }
    const PATH = "build/.well-known";
    const doc = didTemplate(url);
    if(!fs.existsSync(PATH)){
      fs.mkdirSync(PATH);
    }
    fs.writeFile(`${PATH}/did.json`, doc, err => {
      if(err) {
        reject(err);
      } else {
        console.log("did.json created");
        resolve();
      }
    });
  });
}

async function deployStatic() {
  const args = argParse();
  // Build react app
  process.env.REACT_APP_TARGET_ENV = args.env;
  await run("yarn", [ "build" ]);
  // Create did.json
  await createDid(args.env);
  // Upload to S3
  await run("yarn", [
    "s3-deploy",
    "'./build/**'",
    "'./build/.well-known/**'",
    "--cwd",
    "'./build/'",
    "--region",
    config.region,
    "--bucket",
    config.s3Bucket[args.env]
  ]);
  // Invalidate Cloudfront cache
  if(config.domain[args.env]) {
    await run("yarn", [ "cloudfront-invalidate-cache", "--cname", config.domain[args.env] ])
  }
}

deployStatic();
