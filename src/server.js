const handler = require("serverless-express/handler");
const express = require("serverless-express/express");
const bodyParser = require("body-parser");
const Credentials = require("uport-credentials").Credentials;
const verifyJWT = require("did-jwt").verifyJWT;

const RPC_URL = "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c";

const app = express();
app.use(bodyParser.json());

const ISSUERS = JSON.parse(process.env.ISSUERS);

const getCredentials = (serviceId) => {
  if(!ISSUERS[serviceId])
    throw new Error("Invalid serviceId");
  return new Credentials({
    did: ISSUERS[serviceId].did,
    privateKey: ISSUERS[serviceId].key,
    ethrConfig: {
      rpcUrl: RPC_URL
    }
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
    vc: ISSUERS[serviceId].vc
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
    vc: ISSUERS[serviceId].vc,
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

module.exports.handler = handler(app);
