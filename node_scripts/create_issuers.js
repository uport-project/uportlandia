const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");
const uport = require("uport-credentials");
const verifyJWT = require("did-jwt").verifyJWT;
const resolve = require("did-resolver");

const { ISSUER_PROFILES } = require("../setup_config");

//  ---- You probably don't need to change anything below this ----

async function ipfsAdd (data) {
  const formData = new FormData();
  formData.append("file", data);
  const resp = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
    method: "post",
    body: formData
  });
  if(resp.ok) {
    return (await resp.json()).Hash;
  }
  const err = resp.text();
  throw new Error(err);
}

async function uploadAppImage (filePath) {
  const profileImage = fs.readFileSync(filePath);
  const result = await ipfsAdd(profileImage);
  return `/ipfs/${result}`;
}

async function createIssuer (app) {
  console.log("Registering", app.name, "...")
  const { did, privateKey } = uport.Credentials.createIdentity();
  const profileImage = await uploadAppImage(app.profileImage);
  const profile = {
    name: app.name,
    url: app.url,
    profileImage: {
      "/": profileImage
    }
  };
  const credentials = new uport.Credentials({
    appName: app.name,
    did,
    privateKey
  });
  const jwt = await credentials.createVerification({
    sub: did,
    claim: profile
  });
  const buffer = Buffer.from(jwt);
  const hash = await ipfsAdd(buffer);
  const data = {
    did,
    key: privateKey,
    vc: [ `/ipfs/${hash}` ]
  };
  return {
    [app.id]: data
  };
}

async function createIssuers() {
  const secrets = {};
  const pArr = [];
  for(let i = 0; i < ISSUER_PROFILES.length; i++) {
    pArr.push(createIssuer(ISSUER_PROFILES[i]));
  }
  const dataArr = await Promise.all(pArr);
  return dataArr.reduce((val, acc) => ({
    ...acc,
    ...val
  }), {});
}

module.exports = createIssuers;
