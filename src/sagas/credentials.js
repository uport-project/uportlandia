import { spawn, takeEvery, put, call } from "redux-saga/effects";
import { transport } from "uport-transports";
import { captureException } from "@sentry/browser";

import {
  CRED_VERIFY,
  REQ_DISCLOSURE,
  SEND_VERIF
} from "../constants/actions";
import {
  reqDisclosureSuccess,
  saveProfile,
  setLoading,
  verifyCredentialsSuccess,
  sendVerificationSuccess,
} from "../actions";
import createChasquiUrl from "../utils/createChasquiUrl";
import createCallbackUrl from "../utils/createCallbackUrl";
import request from "../utils/request";
import SIGNER_URL from "../constants/signerUrl";

function* verifyCredentials (action) {
  const { serviceId, token } = action;
  yield put(setLoading(CRED_VERIFY, true));
  try {
    const response = yield call(request, `${SIGNER_URL}api/verify_credentials`, {
      method: "post",
      dataType: "json",
      data: {
        serviceId,
        token
      }
    });
    const { profile } = response.json;
    profile.publicEncKey = profile.boxPub;
    yield put(verifyCredentialsSuccess(profile));
    yield put(saveProfile(profile));
  } catch(ex) {
    console.error(ex);
    captureException(ex);
  }
  yield put(setLoading(CRED_VERIFY, false));
}

function* requestDisclosure(action) {
  const { serviceId, callbackId, requestedClaims, isMobile } = action;
  const callbackUrl = isMobile
    ? createCallbackUrl(callbackId)
    : createChasquiUrl(callbackId);

  const expiresIn = 2 * 60; // seconds
  yield put(setLoading(REQ_DISCLOSURE, true));
  try {
    const response = yield call(request, `${SIGNER_URL}api/request_disclosure`, {
      method: "post",
      dataType: "json",
      data: {
        serviceId,
        requested: [ "name" ],
        verified: requestedClaims,
        notifications: !isMobile,
        callbackUrl,
        expiresIn
      }
    });
    const { jwt } = response.json;
    if(isMobile) {
      yield put(reqDisclosureSuccess(
        callbackId,
        `me.uport:req/${jwt}?callback_type=redirect&redirect_url=${callbackUrl}`
      ));
    } else {
      yield put(reqDisclosureSuccess(callbackId, `me.uport:req/${jwt}`));
    }
  } catch(ex) {
    console.log(ex);
    captureException(ex);
  }
  yield put(setLoading(REQ_DISCLOSURE, false));
}

function* sendVerification(action) {
  const callbackId = action.callbackId;
  const serviceId = action.serviceId;
  const profile = action.profile;
  const claim = action.claim;
  const isMobile = action.isMobile;
  const pushToken = profile.pushToken;
  const publicEncKey = profile.publicEncKey;
  const callbackUrl = isMobile
    ? createCallbackUrl(callbackId)
    : createChasquiUrl(callbackId);
  yield put(setLoading(SEND_VERIF, true));
  try {
    const response = yield call(request, `${SIGNER_URL}api/send_verification`, {
      method: "post",
      dataType: "json",
      data: {
        serviceId,
        sub: profile.did,
        claim,
        callbackUrl
      }
    });
    const { jwt } = response.json;
    if(isMobile) {
      yield put(sendVerificationSuccess(
        callbackId,
        `me.uport:req/${jwt}?callback_type=redirect&redirect_url=${callbackUrl}`
      ));
    } else {
      if(pushToken && publicEncKey) {
        transport.push.send(pushToken, publicEncKey)(jwt);
        yield put(sendVerificationSuccess(callbackId, `me.uport:req/${jwt}`, true));
      } else {
        yield put(sendVerificationSuccess(callbackId, `me.uport:req/${jwt}`));
      }
    }
  } catch(ex) {
    console.log(ex);
    captureException(ex);
  }
  yield put(setLoading(SEND_VERIF, false));
}

export default function* () {
  yield spawn(takeEvery, CRED_VERIFY, verifyCredentials);
  yield spawn(takeEvery, REQ_DISCLOSURE, requestDisclosure);
  yield spawn(takeEvery, SEND_VERIF, sendVerification);
}
