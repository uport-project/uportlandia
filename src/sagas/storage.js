import { spawn, takeEvery, put, call, all } from "redux-saga/effects";
import localforage from "localforage";

import {
  LOAD_PROFILE,
  LOGOUT,
  SAVE_PROFILE
} from "../constants/actions";
import {
  loadProfileFailure,
  loadProfileSuccess,
  setLoading
} from "../actions";

const STORAGE_KEY = "uportlandia";

function* loadProfile() {
  const data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
  if(data && data.profile)
    yield put(loadProfileSuccess(data.profile));
  else
    yield put(loadProfileFailure("No saved profile"));
}

function* saveProfile(action) {
  const { profile } = action;
  let data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
  if(!data)
  data = {};
  data.profile = profile;
  localforage.setItem(STORAGE_KEY, data);
}

function* clearProfile() {
  let data = yield call(localforage.getItem.bind(localforage), STORAGE_KEY);
  if(!data)
    data = {};
  data.profile = null;
  localforage.setItem(STORAGE_KEY, data);
}

export default function* () {
  yield spawn(takeEvery, SAVE_PROFILE, saveProfile);
  yield spawn(takeEvery, LOAD_PROFILE, loadProfile);
  yield spawn(takeEvery, LOGOUT, clearProfile);
}
