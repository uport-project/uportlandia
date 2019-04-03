const fs = require("fs");

const PATH = "build/.well-known";

const URLS = {
  "stage": "uportlandia.uport.space",
  "production": "uportlandia.uport.me"
};

const template = url =>
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

const args = process.argv.slice(2);
if(!args || !args[0]) {
  throw new Error("Environment not specified");
} else {
  const url = URLS[args[0]] || URLS.stage;
  const doc = template(url);
  if(!fs.existsSync(PATH)){
    fs.mkdirSync(PATH);
  }
  fs.writeFile(`${PATH}/did.json`, doc, err => {
    if(err) {
      throw new Error(err);
    }
    console.log("did.json created");
  });
}
