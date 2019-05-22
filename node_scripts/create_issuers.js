const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");
const uport = require("uport-credentials");
const verifyJWT = require("did-jwt").verifyJWT;
const resolve = require("did-resolver");

const SERVICES = [{
  id: "CITY_ID",
  name: "The City of uPortlandia",
  url: "https://uportlandia.uport.space/city",
  profileImage: "src/images//city-logo.png"
}, {
  id: "DIPLOMA",
  name: "The University of uPortlandia",
  url: "https://uportlandia.uport.space/university",
  profileImage: "src/images//university-logo.png"
}, {
  id: "COMPANY",
  name: "Dream Job LLC.",
  url: "https://uportlandia.uport.space/company",
  profileImage: "src/images//company-logo.png"
}, {
  id: "INSURANCE",
  name: "People Care LLC.",
  url: "https://uportlandia.uport.space/insurance",
  profileImage: "src/images//insurance-logo.png"
}, {
  id: "PHARMACY",
  name: "Your Health Medical Center",
  url: "https://uportlandia.uport.space/pharmacy",
  profileImage: "src/images//pharmacy-logo.png"
}, {
  id: "TRANSPORT",
  name: "uPortlandia City Transit",
  url: "https://uportlandia.uport.space/transport",
  profileImage: "src/images//transport-logo.png"
}, {
  id: "MUSEUM",
  name: "uPortlandia Museum of Modern Art",
  url: "https://uportlandia.uport.space/museum",
  profileImage: "src/images//museum-logo.png"
}];

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
  console.log(data);
  return data;
}

async function createIssuers() {
  const secrets = {};
  for(let i = 0; i < SERVICES.length; i++) {
    const data = await createIssuer(SERVICES[i]);
    secrets[SERVICES[i].id] = data;
  }
  fs.writeFile(".issuers.json", JSON.stringify(secrets), err => {
    if(err) {
      throw new Error(err);
    }
    console.log("Issuer apps created");
  });
}

createIssuers();
