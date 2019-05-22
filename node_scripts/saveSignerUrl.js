const fs = require("fs");

const LAMBDA_URL = process.env.LAMBDA_URL;
const STEP = process.env.STEP;

if(STEP && STEP >= 1) {
  const stage = process.argv[2];

  if(process.argv.length !== 3 || !LAMBDA_URL || !stage) {
    throw new Error("Sample usage: node saveSignerUrl production https://foo.bar/api/")
  }

  if(env === "production") {
    fs.writeFile(`src/constants/signer.prod.js`, `// Do not edit\nexport default "${LAMBDA_URL}";\n`, err => {
      if(err) {
        throw new Error(err);
      }
      console.log("signer.prod.js created");
    });
  } else {
    fs.writeFile(`src/constants/signer.stage.js`, `// Do not edit\nexport default "${LAMBDA_URL}";\n`, err => {
      if(err) {
        throw new Error(err);
      }
      console.log("signer.stage.js created");
    });
  }
}
