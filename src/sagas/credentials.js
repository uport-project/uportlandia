import { spawn, takeEvery, put, call, all } from "redux-saga/effects";
import { Credentials } from "uport-credentials";
import { verifyJWT } from "did-jwt";

import {
  CRED_INIT,
  CRED_VERIFY,
  REQ_DISCLOSURE
} from "../constants/actions";
import {
  initCredentialsSuccess,
  reqDisclosureSuccess,
  saveProfile,
  setLoading,
  verifyCredentialsSuccess
} from "../actions";
import createChasquiUrl from "../utils/createChasquiUrl";

let keypair;
let credentials;
let didDoc;

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
  yield put(verifyCredentialsSuccess(profile));
  yield put(saveProfile(profile));
  yield put(setLoading(CRED_VERIFY, false));
}

function* requestDisclosure(action) {
  const { callbackId } = action;
  const callbackUrl = createChasquiUrl(callbackId);
  const expiresIn = 2 * 60; // seconds
  console.log(callbackUrl);
  yield put(setLoading(REQ_DISCLOSURE, true));
  const jwt = yield call(
    credentials.createDisclosureRequest.bind(credentials),
    {
      requested: [ "name" ],
      verified: [ "uport-apps" ],
      notifications: true,
      callbackUrl,
      accountType: "keypair",
    },
    expiresIn
  );
  yield put(reqDisclosureSuccess(callbackId, `https://id.uport.me/req/${jwt}`));
  yield put(setLoading(REQ_DISCLOSURE, false));
}

export default function* () {
  yield spawn(takeEvery, CRED_INIT, initCredentials);
  yield spawn(takeEvery, CRED_VERIFY, verifyCredentials);
  yield spawn(takeEvery, REQ_DISCLOSURE, requestDisclosure);
}
