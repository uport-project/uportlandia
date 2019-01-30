import { spawn, takeEvery } from "redux-saga/effects"
import history from "../utils/history";

import {
  REDIR_CITY_HOME,
  REDIR_CITY_ID_FORM,
  REDIR_CITY_ID_FORM_SUB,
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

export default function* handleRedirects() {
  yield spawn(takeEvery, REDIR_CITY_HOME, redirectToCityHome);
  yield spawn(takeEvery, REDIR_CITY_ID_FORM, redirectToCityIdForm);
  yield spawn(takeEvery, REDIR_CITY_ID_FORM_SUB, redirectToCityIdFormSubmit);
  yield spawn(takeEvery, REDIR_HOME, redirectToHome);
}
