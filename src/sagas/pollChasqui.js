import { takeEvery, put, call } from "redux-saga/effects";
import { captureException } from "@sentry/browser";

import { POLL_CHASQUI, STOP_POLL_CHASQUI } from "../constants/actions";
import createChasquiUrl from "../utils/createChasquiUrl";
import isJWT from "../utils/isJWT";
import {
  pollChasquiSuccess
} from "../actions";
import request from "../utils/request";

let openRequests = [];

const delay = async () => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, 2000)
});

const poll = async (url, callbackId) => {
  const getContent = async () => {
    const response = await request(url, {
      type: "get",
      dataType: "json"
    });
    const data = response.json;
    if(!data)
      throw new Error(`No response from ${url}`);
    if(data.status !== "success")
      throw new Error(`Failed response from ${url}`);
    const content = data && data.message && data.message.content;
    if(content && content.length) {
      try {
        const contentJSON = JSON.parse(content);
        if(isJWT(contentJSON.access_token))
          return contentJSON.access_token;
      } catch(ex) {
        console.log(ex);
        captureException(ex);
        return null;
      }
    }
  };
  let content = await getContent();
  while(!content) {
    await delay();
    const index = openRequests.findIndex(id => id === callbackId);
    if(index === -1)
      break;
    content = await getContent();
  }
  return content;
};

function* pollChasqui(action) {
  try {
    const { callbackId } = action;
    openRequests.push(callbackId);
    const response = yield call(poll, createChasquiUrl(callbackId), callbackId);
    yield put(pollChasquiSuccess(callbackId, response));
  } catch(ex) {
    console.log(ex);
    captureException(ex);
  }
};

function stopPollChasqui(action) {
  const { callbackId } = action;
  const index = openRequests.findIndex(id => id === callbackId);
  if(index !== -1)
    openRequests.splice(index, 1);
};

export default function* () {
  yield takeEvery(POLL_CHASQUI, pollChasqui);
  yield takeEvery(STOP_POLL_CHASQUI, stopPollChasqui);
}
