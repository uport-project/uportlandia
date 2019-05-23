const { ServiceEndpoint } = require("../stack.json");
const fs = require("fs");

const LAMBDA_URL = ServiceEndpoint;
const STEP = process.env.STEP;

if(STEP && STEP >= 1) {
  const stage = process.argv[2];

  if(process.argv.length !== 3 || !LAMBDA_URL || !stage) {
    throw new Error("Sample usage: node saveSignerUrl prod https://foo.bar/api/")
  }

  if(process.argv[0] === "prod") {
    fs.writeFile(`../src/constants/signer.prod.js`, `// Do not edit\nexport default "${LAMBDA_URL}";\n`, err => {
      if(err) {
        throw new Error(err);
      }
      console.log("signer.prod.js created");
    });
  } else {
    fs.writeFile(`../src/constants/signer.stage.js`, `// Do not edit\nexport default "${LAMBDA_URL}";\n`, err => {
      if(err) {
        throw new Error(err);
      }
      console.log("signer.stage.js created");
    });
  }
}
