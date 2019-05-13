import { call, put, spawn, takeEvery } from "redux-saga/effects"
import { push, replace } from "connected-react-router"

import {
  REDIR_CITY_HOME,
  REDIR_CITY_ID_FORM,
  REDIR_CITY_ID_FORM_SUB,
  REDIR_CITY_ID_RCD,
  REDIR_CITY_ID_EXISTS,
  REDIR_FAIL,
  REDIR_SERV_HOME,
  REDIR_RCV_CLAIM,
  REDIR_RCD_CLAIM,
  NAV_EXTERNAL,
  REDIR_HOME
} from "../constants/actions";
import { navigateExternalReset } from "../actions";
import SERVICES from "../constants/services";

function* redirectToHome() {
  yield put(push("/"));
}

function* redirectToCityHome() {
  yield put(push("/city"));
}

function* redirectToCityIdForm() {
  yield put(push("/city/personalinfo"));
}

function* redirectToCityIdFormSubmit() {
  yield put(push("/city/submitted"));
}

function* redirectToCityIdReceived() {
  yield put(push("/city/complete"));
}

function* redirectToCityIdExists() {
  yield put(push("/city/exists"));
}

function* redirectToServiceHome(action) {
  const { serviceId } = action;
  yield put(push(SERVICES[serviceId].url));
}

function* redirectToFailure(action) {
  const { serviceId } = action;
  yield put(push(`${SERVICES[serviceId].url}/prerequisites`));
}

function* redirectToReceiveClaim(action) {
  const { serviceId } = action;
  yield put(push(`${SERVICES[serviceId].url}/receive`));
}

function* redirectToClaimReceived(action) {
  const { serviceId } = action;
  yield put(push(`${SERVICES[serviceId].url}/prerequisites`));
}

function* navigateExternal(action) {
  const { url } = action;
  const pause = () => new Promise((resolve) => setTimeout(resolve, 4000));
  yield put(push("/redirect"));
  yield call(pause);
  yield put(replace(url));
  yield put(navigateExternalReset());
}

export default function* handleRedirects() {
  yield spawn(takeEvery, REDIR_CITY_HOME, redirectToCityHome);
  yield spawn(takeEvery, REDIR_CITY_ID_FORM, redirectToCityIdForm);
  yield spawn(takeEvery, REDIR_CITY_ID_FORM_SUB, redirectToCityIdFormSubmit);
  yield spawn(takeEvery, REDIR_CITY_ID_RCD, redirectToCityIdReceived);
  yield spawn(takeEvery, REDIR_CITY_ID_EXISTS, redirectToCityIdExists);
  yield spawn(takeEvery, REDIR_SERV_HOME, redirectToServiceHome);
  yield spawn(takeEvery, REDIR_RCV_CLAIM, redirectToReceiveClaim);
  yield spawn(takeEvery, REDIR_RCD_CLAIM, redirectToClaimReceived);
  yield spawn(takeEvery, REDIR_FAIL, redirectToFailure);
  yield spawn(takeEvery, NAV_EXTERNAL, navigateExternal);
  yield spawn(takeEvery, REDIR_HOME, redirectToHome);
}
