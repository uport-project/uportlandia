import { spawn, takeEvery, put, call } from "redux-saga/effects";
import localforage from "localforage";

import {
  // LOAD_PROFILE,
  // LOGOUT,
  // SAVE_PROFILE,
  SAVE_DID,
  LOAD_DID
} from "../constants/actions";
import {
  // loadProfileFailure,
  // loadProfileSuccess,
  loadDidSuccess,
  loadDidFailure,
  // setLoading
} from "../actions";

const STORAGE_KEY = "uportlandia";

// function* loadProfile() {
//   const data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
//   if(data && data.profile)
//     yield put(loadProfileSuccess(data.profile));
//   else
//     yield put(loadProfileFailure("No saved profile"));
// }

// function* saveProfile(action) {
//   const { profile } = action;
//   let data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
//   if(!data)
//   data = {};
//   data.profile = profile;
//   localforage.setItem(STORAGE_KEY, data);
// }

// function* clearProfile() {
//   let data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
//   if(!data)
//     data = {};
//   data.profile = null;
//   localforage.setItem(STORAGE_KEY, data);
// }

function* loadDid() {
  const data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
  if(data && data.audience)
    yield put(loadDidSuccess(data.audience));
  else
    yield put(loadDidFailure("No saved did"));
}

function* saveDid(action) {
  const { did } = action;
  let data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
  if(!data)
    data = {};
  data.audience = did;
  localforage.setItem(STORAGE_KEY, data);
}

// function* clearDid() {
//   let data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
//   if(!data)
//     data = {};
//   data.audience = null;
//   localforage.setItem(STORAGE_KEY, data);
// }

export default function* () {
  // yield spawn(takeEvery, SAVE_PROFILE, saveProfile);
  // yield spawn(takeEvery, LOAD_PROFILE, loadProfile);
  // yield spawn(takeEvery, LOGOUT, clearProfile);
  yield spawn(takeEvery, SAVE_DID, saveDid);
  yield spawn(takeEvery, LOAD_DID, loadDid);
}
