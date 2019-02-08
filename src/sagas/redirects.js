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
  REDIR_EMPL_HOME,
  REDIR_RCV_EMPL,
  REDIR_EMPL_PREREQ,
  REDIR_EMPL_RCD,
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

function redirectToEmploymentHome() {
  history.push("/company");
}

function redirectToEmploymentRequirement() {
  history.push("/company/prerequisites");
}

function redirectToReceiveEmployment() {
  history.push("/company/receive");
}

function redirectToEmploymentReceived() {
  history.push("/company/complete");
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
  yield spawn(takeEvery, REDIR_EMPL_HOME, redirectToEmploymentHome);
  yield spawn(takeEvery, REDIR_RCV_EMPL, redirectToReceiveEmployment);
  yield spawn(takeEvery, REDIR_EMPL_PREREQ, redirectToEmploymentRequirement);
  yield spawn(takeEvery, REDIR_EMPL_RCD, redirectToEmploymentReceived);
  yield spawn(takeEvery, REDIR_HOME, redirectToHome);
}
