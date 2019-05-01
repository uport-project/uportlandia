const express = require("serverless-express/express");
const bodyParser = require("body-parser");
const Credentials = require("uport-credentials").Credentials;
const verifyJWT = require("did-jwt").verifyJWT;

const app = express();
app.use(bodyParser.json());

const DID = {
  CITY_ID   : "did:ethr:0xab258a17256ccedb922d680a5dd204ba6b981f09",
  DIPLOMA   : "did:ethr:0xf25357579f64eb14b6bdfefbc752bea7c77819a1",
  COMPANY   : "did:ethr:0x4d9afb81acbf8daae007736621b1b01e73e66742",
  INSURANCE : "did:ethr:0x882158ee29a448be99eb058631de6890fdf82367",
  PHARMACY  : "did:ethr:0xc52b57a9af9d6760743d5df30c883f5892ec02e4",
  TRANSPORT : "did:ethr:0x5c791a6a5093a511f31bcfaa1b6276d0b5eae3cb",
  MUSEUM    : "did:ethr:0x20b53a43147291c4884dd173c80c1d83ed76cf0e",
  "default" : "did:ethr:0x701316d159542ba75e5e4b02e4883ceb5f14485e"
}
const VERIFIED_CLAIM = {
  CITY_ID   : [ "/ipfs/QmdWnsgD9NuQcBauU8eArxRMCkbDQ42q8miChb6woHmRTR" ],
  DIPLOMA   : [ "/ipfs/Qmc25fEYnAayi55P526w1TtJZx4gZDoDgtjHhrCUKCfDSU" ],
  COMPANY   : [ "/ipfs/QmRnfAn98Y4QfNvZje8hiSextdY6uPhiAmRLidQJwChUZo" ],
  INSURANCE : [ "/ipfs/QmWb3XmxwywQgQy4uzMvSU6V795jnogY7QELDYvWn8z22a" ],
  PHARMACY  : [ "/ipfs/QmW4i3JYBEcNo5rJ4MTtnWiNzxdZQ5KPwwVDQcqdThM4my" ],
  TRANSPORT : [ "/ipfs/QmVYSaqGeYDGtKr61oy8XbE8armY4FFjQm2PoG37Ksj8wY" ],
  MUSEUM    : [ "/ipfs/QmTuzXVZcLLjY2resVpKBYUAU5G5iGZKP5QTx1aM3KzKbY" ],
  "default" : [ "/ipfs/QmTaTFeJY5mgcn8nJMSfDkGfkdP5PTUjV4dzAuCDDiANVC" ]
};

const credentials = {};

const getCredentials = (serviceId="default") => {
  const allowedIds = [
    "CITY_ID",
    "DIPLOMA",
    "COMPANY",
    "INSURANCE",
    "PHARMACY",
    "TRANSPORT",
    "MUSEUM",
    "default"
  ];
  if(credentials[serviceId])
    return credentials[serviceId];
  if(!allowedIds.find(aid => serviceId === aid))
    throw new Error("Invalid serviceId");
  return credentials[serviceId] = new Credentials({
    did: DID[serviceId],
    privateKey: process.env[`${serviceId}_SIGNING_KEY`]
  });
}

app.get("/api/ping", (req, res) => {
  res.send("OK");
});

app.post("/api/request_disclosure", async (req, res) => {
  const {
    serviceId,
    requested=["name"],
    verified=[],
    notifications=false,
    callbackUrl,
    expiresIn=600
  } = req.body;
  const credentials = getCredentials(serviceId);
  const jwt = await credentials.createDisclosureRequest({
    requested,
    verified,
    notifications,
    callbackUrl,
    accountType: "none",
    vc: VERIFIED_CLAIM[serviceId]
  }, expiresIn);
  res.json({ jwt });
});

app.post("/api/send_verification", async (req, res) => {
  const {
    serviceId,
    sub,
    claim,
    callbackUrl
  } = req.body;
  const credentials = getCredentials(serviceId);
  const jwt = await credentials.createVerification({
    sub,
    vc: VERIFIED_CLAIM[serviceId],
    claim,
    callbackUrl
  });
  res.json({ jwt });
});

app.post("/api/verify_credentials", async (req, res) => {
  const { serviceId, token } = req.body;
  const credentials = getCredentials(serviceId);
  const response = await verifyJWT(token, { audience: credentials.did });
  const profile = await credentials.processDisclosurePayload(response);
  profile.publicEncKey = profile.boxPub;
  res.json({ profile });
});

module.exports = app;
