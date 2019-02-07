import { spawn, takeEvery } from "redux-saga/effects"
import history from "../utils/history";

import {
  REDIR_CITY_HOME,
  REDIR_CITY_ID_FORM,
  REDIR_CITY_ID_FORM_SUB,
  REDIR_CITY_ID_RCD,
  REDIR_DIPLOMA_HOME,
  REDIR_RCV_DIPLOMA,
  REDIR_DIPLOMA_PREREQ,
  REDIR_DIPLOMA_RCD,
  REDIR_HOME
} from "../constants/actions";

function redirectToHome() {
  history.push("/");
}

function redirectToCityHome() {
  history.push("/city");
}

function redirectToCityIdForm() {
  history.push("/city/personalinfo");
}

function redirectToCityIdFormSubmit() {
  history.push("/city/submitted");
}

function redirectToCityIdReceived() {
  history.push("/city/complete");
}

function redirectToDiplomaHome() {
  history.push("/university");
}

function redirectToDiplomaRequirement() {
  history.push("/university/prerequisites");
}

function redirectToReceiveDiploma() {
  history.push("/university/receive");
}

function redirectToDiplomaReceived() {
  history.push("/university/complete");
}

export default function* handleRedirects() {
  yield spawn(takeEvery, REDIR_CITY_HOME, redirectToCityHome);
  yield spawn(takeEvery, REDIR_CITY_ID_FORM, redirectToCityIdForm);
  yield spawn(takeEvery, REDIR_CITY_ID_FORM_SUB, redirectToCityIdFormSubmit);
  yield spawn(takeEvery, REDIR_CITY_ID_RCD, redirectToCityIdReceived);
  yield spawn(takeEvery, REDIR_DIPLOMA_HOME, redirectToDiplomaHome);
  yield spawn(takeEvery, REDIR_RCV_DIPLOMA, redirectToReceiveDiploma);
  yield spawn(takeEvery, REDIR_DIPLOMA_PREREQ, redirectToDiplomaRequirement);
  yield spawn(takeEvery, REDIR_DIPLOMA_RCD, redirectToDiplomaReceived);
  yield spawn(takeEvery, REDIR_HOME, redirectToHome);
}
