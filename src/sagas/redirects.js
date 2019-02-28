import { call, put, spawn, takeEvery } from "redux-saga/effects"
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
  REDIR_INSR_HOME,
  REDIR_RCV_INSR,
  REDIR_INSR_PREREQ,
  REDIR_INSR_RCD,
  REDIR_PRSC_HOME,
  REDIR_RCV_PRSC,
  REDIR_PRSC_PREREQ,
  REDIR_PRSC_RCD,
  REDIR_BUS_TKT_HOME,
  REDIR_RCV_BUS_TKT,
  REDIR_BUS_TKT_PREREQ,
  REDIR_BUS_TKT_RCD,
  REDIR_MUS_TKT_HOME,
  REDIR_RCV_MUS_TKT,
  REDIR_MUS_TKT_PREREQ,
  REDIR_MUS_TKT_RCD,
  NAV_EXTERNAL,
  REDIR_HOME
} from "../constants/actions";
import { navigateExternalReset } from "../actions";

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

function redirectToInsuranceHome() {
  history.push("/insurance");
}

function redirectToInsuranceRequirement() {
  history.push("/insurance/prerequisites");
}

function redirectToReceiveInsurance() {
  history.push("/insurance/receive");
}

function redirectToInsuranceReceived() {
  history.push("/insurance/complete");
}

function redirectToPrescriptionHome() {
  history.push("/pharmacy");
}

function redirectToPrescriptionRequirement() {
  history.push("/pharmacy/prerequisites");
}

function redirectToReceivePrescription() {
  history.push("/pharmacy/receive");
}

function redirectToPrescriptionReceived() {
  history.push("/pharmacy/complete");
}

function redirectToBusTicketHome() {
  history.push("/transport");
}

function redirectToBusTicketRequirement() {
  history.push("/transport/prerequisites");
}

function redirectToReceiveBusTicket() {
  history.push("/transport/receive");
}

function redirectToBusTicketReceived() {
  history.push("/transport/complete");
}

function redirectToMuseumMembershipHome() {
  history.push("/museum");
}

function redirectToMuseumMembershipRequirement() {
  history.push("/museum/prerequisites");
}

function redirectToReceiveMuseumMembership() {
  history.push("/museum/receive");
}

function redirectToMuseumMembershipReceived() {
  history.push("/museum/complete");
}

function* navigateExternal(action) {
  const { url, name } = action;
  const openUrl = () => new Promise((resolve, reject) => setTimeout(() => {
    history.replace(url);
    resolve();
  }, 4000));
  history.push(`/redirect`);
  yield call(openUrl);
  yield put(navigateExternalReset());
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
  yield spawn(takeEvery, REDIR_INSR_HOME, redirectToInsuranceHome);
  yield spawn(takeEvery, REDIR_RCV_INSR, redirectToReceiveInsurance);
  yield spawn(takeEvery, REDIR_INSR_PREREQ, redirectToInsuranceRequirement);
  yield spawn(takeEvery, REDIR_INSR_RCD, redirectToInsuranceReceived);
  yield spawn(takeEvery, REDIR_PRSC_HOME, redirectToPrescriptionHome);
  yield spawn(takeEvery, REDIR_RCV_PRSC, redirectToReceivePrescription);
  yield spawn(takeEvery, REDIR_PRSC_PREREQ, redirectToPrescriptionRequirement);
  yield spawn(takeEvery, REDIR_PRSC_RCD, redirectToPrescriptionReceived);
  yield spawn(takeEvery, REDIR_BUS_TKT_HOME, redirectToBusTicketHome);
  yield spawn(takeEvery, REDIR_RCV_BUS_TKT, redirectToReceiveBusTicket);
  yield spawn(takeEvery, REDIR_BUS_TKT_PREREQ, redirectToBusTicketRequirement);
  yield spawn(takeEvery, REDIR_BUS_TKT_RCD, redirectToBusTicketReceived);
  yield spawn(takeEvery, REDIR_MUS_TKT_HOME, redirectToMuseumMembershipHome);
  yield spawn(takeEvery, REDIR_RCV_MUS_TKT, redirectToReceiveMuseumMembership);
  yield spawn(takeEvery, REDIR_MUS_TKT_PREREQ, redirectToMuseumMembershipRequirement);
  yield spawn(takeEvery, REDIR_MUS_TKT_RCD, redirectToMuseumMembershipReceived);
  yield spawn(takeEvery, NAV_EXTERNAL, navigateExternal);
  yield spawn(takeEvery, REDIR_HOME, redirectToHome);
}
