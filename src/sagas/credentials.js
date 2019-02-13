import { spawn, takeEvery, put, call, all } from "redux-saga/effects";
import { Credentials } from "uport-credentials";
import { transport } from "uport-transports";
import { verifyJWT } from "did-jwt";

import {
  CRED_INIT,
  CRED_VERIFY,
  REQ_DISCLOSURE,
  SEND_VERIF
} from "../constants/actions";
import {
  initCredentialsSuccess,
  reqDisclosureSuccess,
  saveProfile,
  setLoading,
  verifyCredentialsSuccess,
  sendVerificationSuccess,
} from "../actions";
import createChasquiUrl from "../utils/createChasquiUrl";
import { addFile } from '../utils/ipfs'

let keypair;
let credentials;
let didDoc;
let verifiedClaims = [];

async function signAndUploadProfile() {
  if(verifiedClaims.length) {
    return;
  }
  const profile = {
    name: "Cleverland",
    description: 'The City of Cleverland',
    url: (typeof window !== 'undefined')
      ? `${window.location.protocol}//${window.location.host}`
      : undefined,
    profileImage: {
      "/": "/ipfs/Qmez4bdFmxPknbAoGzHmpjpLjQFChq39h5UMPGiwUHgt8f"
    },
    bannerImage: {
      "/": "/ipfs/QmTFNFu1v4dev6YCDoMuSG9Zi3EubagUJ4LQxoZkMiBPSF"
    }
  };
  // Upload to ipfs
  const jwt = await credentials.createVerification({
    sub: keypair.did,
    claim: profile
  });
  const response = await addFile(new Blob([ jwt ]));
  verifiedClaims.unshift(`/ipfs/${response.Hash}`);
}

function* initCredentials() {
  keypair = Credentials.createIdentity();
  credentials = new Credentials(keypair);
  yield put(initCredentialsSuccess());
}

function* verifyCredentials (action) {
  const { token } = action;
  yield put(setLoading(CRED_VERIFY, true));
  const res = yield call(verifyJWT, token, { audience: credentials.did });
  didDoc = res.doc;
  const profile = yield call(
    credentials.processDisclosurePayload.bind(credentials),
    res
  );
  profile.publicEncKey = profile.boxPub;
  yield put(verifyCredentialsSuccess(profile));
  yield put(saveProfile(profile));
  yield put(setLoading(CRED_VERIFY, false));
}

function* requestDisclosure(action) {
  const { callbackId, requestedClaims } = action;
  const callbackUrl = createChasquiUrl(callbackId);
  const expiresIn = 2 * 60; // seconds
  yield put(setLoading(REQ_DISCLOSURE, true));
  yield call(signAndUploadProfile);
  const jwt = yield call(
    credentials.createDisclosureRequest.bind(credentials),
    {
      requested: [ "name" ],
      verified: requestedClaims,
      notifications: true,
      callbackUrl,
      accountType: "keypair",
      vc: verifiedClaims
    },
    expiresIn
  );
  yield put(reqDisclosureSuccess(callbackId, `https://id.uport.me/req/${jwt}`));
  yield put(setLoading(REQ_DISCLOSURE, false));
}

function* sendVerification(action) {
  const callbackId = action.callbackId;
  const profile = action.profile;
  const claim = action.claim;
  const pushToken = profile.pushToken;
  const publicEncKey = profile.publicEncKey;
  const callbackUrl = createChasquiUrl(callbackId);
  yield put(setLoading(SEND_VERIF, true));
  yield call(signAndUploadProfile);
  const jwt = yield call(
    credentials.createVerification.bind(credentials),
    {
      sub: profile.did,
      vc: verifiedClaims,
      claim,
      callbackUrl
    }
  );
  if(pushToken && publicEncKey) {
    transport.push.send(pushToken, publicEncKey)(jwt);
    yield put(sendVerificationSuccess(callbackId, `https://id.uport.me/req/${jwt}`, true));
  } else {
    yield put(sendVerificationSuccess(callbackId, `https://id.uport.me/req/${jwt}`));
  }
  yield put(setLoading(SEND_VERIF, false));
}

export default function* () {
  yield spawn(takeEvery, CRED_INIT, initCredentials);
  yield spawn(takeEvery, CRED_VERIFY, verifyCredentials);
  yield spawn(takeEvery, REQ_DISCLOSURE, requestDisclosure);
  yield spawn(takeEvery, SEND_VERIF, sendVerification);
}
