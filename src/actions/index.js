import * as ACTIONS from "../constants/actions";

export const setLoading = (id, status) => ({
  type: ACTIONS.IS_LOADING,
  id,
  status
});

export const pollChasqui = callbackId => ({
  type: ACTIONS.POLL_CHASQUI,
  callbackId
});

export const pollChasquiSuccess = (callbackId, value) => ({
  type: ACTIONS.POLL_CHASQUI_OK,
  callbackId,
  value
});

export const initCredentials = () => ({
  type: ACTIONS.CRED_INIT
});

export const initCredentialsSuccess = () => ({
  type: ACTIONS.CRED_INIT_OK
});

export const reqDisclosure = (callbackId, requestedClaims) => ({
  type: ACTIONS.REQ_DISCLOSURE,
  callbackId,
  requestedClaims
});

export const reqDisclosureSuccess = (callbackId, url) => ({
  type: ACTIONS.REQ_DISCLOSURE_OK,
  callbackId,
  url
});

export const verifyCredentials = token => ({
  type: ACTIONS.CRED_VERIFY,
  token
});

export const verifyCredentialsSuccess = value => ({
  type: ACTIONS.CRED_VERIFY_OK,
  value
});

export const sendVerification = (callbackId, profile, claim) => ({
  type: ACTIONS.SEND_VERIF,
  callbackId,
  profile,
  claim
});

export const sendVerificationSuccess = (callbackId, url, isPush=false) => ({
  type: ACTIONS.SEND_VERIF_OK,
  callbackId,
  url,
  isPush
});

export const sendVerificationFailure = (callbackId, error) => ({
  type: ACTIONS.SEND_VERIF_ERR,
  callbackId,
  error
});

export const logout = () => ({
  type: ACTIONS.LOGOUT
});

export const saveProfile = profile => ({
  type: ACTIONS.SAVE_PROFILE,
  profile
});

export const loadProfile = () => ({
  type: ACTIONS.LOAD_PROFILE
});

export const loadProfileSuccess = value => ({
  type: ACTIONS.LOAD_PROFILE_OK,
  value
});

export const loadProfileFailure = error => ({
  type: ACTIONS.LOAD_PROFILE_ERR,
  error
});

export const redirectToHome = () => ({
  type: ACTIONS.REDIR_HOME
});

export const redirectToCityHome = () => ({
  type: ACTIONS.REDIR_CITY_HOME
});

export const redirectToCityIdForm = () => ({
  type: ACTIONS.REDIR_CITY_ID_FORM
});

export const redirectToCityIdFormSubmit = () => ({
  type: ACTIONS.REDIR_CITY_ID_FORM_SUB
});

export const redirectToCityIdReceived = () => ({
  type: ACTIONS.REDIR_CITY_ID_RCD
});

export const redirectToDiplomaHome = () => ({
  type: ACTIONS.REDIR_DIPLOMA_HOME
});

export const redirectToReceiveDiploma = () => ({
  type: ACTIONS.REDIR_RCV_DIPLOMA
});

export const redirectToDiplomaRequirement = () => ({
  type: ACTIONS.REDIR_DIPLOMA_PREREQ
});

export const redirectToDiplomaReceived = () => ({
  type: ACTIONS.REDIR_DIPLOMA_RCD
});

export const redirectToEmploymentHome = () => ({
  type: ACTIONS.REDIR_EMPL_HOME
});

export const redirectToReceiveEmployment = () => ({
  type: ACTIONS.REDIR_RCV_EMPL
});

export const redirectToEmploymentRequirement = () => ({
  type: ACTIONS.REDIR_EMPL_PREREQ
});

export const redirectToEmploymentReceived = () => ({
  type: ACTIONS.REDIR_EMPL_RCD
});

export const redirectToInsuranceHome = () => ({
  type: ACTIONS.REDIR_INSR_HOME
});

export const redirectToReceiveInsurance = () => ({
  type: ACTIONS.REDIR_RCV_INSR
});

export const redirectToInsuranceRequirement = () => ({
  type: ACTIONS.REDIR_INSR_PREREQ
});

export const redirectToInsuranceReceived = () => ({
  type: ACTIONS.REDIR_INSR_RCD
});


export const redirectToPrescriptionHome = () => ({
  type: ACTIONS.REDIR_PRSC_HOME
});

export const redirectToReceivePrescription = () => ({
  type: ACTIONS.REDIR_RCV_PRSC
});

export const redirectToPrescriptionRequirement = () => ({
  type: ACTIONS.REDIR_PRSC_PREREQ
});

export const redirectToPrescriptionReceived = () => ({
  type: ACTIONS.REDIR_PRSC_RCD
});

export const redirectToBusTicketHome = () => ({
  type: ACTIONS.REDIR_BUS_TKT_HOME
});

export const redirectToReceiveBusTicket = () => ({
  type: ACTIONS.REDIR_RCV_BUS_TKT
});

export const redirectToBusTicketRequirement = () => ({
  type: ACTIONS.REDIR_BUS_TKT_PREREQ
});

export const redirectToBusTicketReceived = () => ({
  type: ACTIONS.REDIR_BUS_TKT_RCD
});

export const redirectToMuseumMembershipHome = () => ({
  type: ACTIONS.REDIR_MUS_TKT_HOME
});

export const redirectToReceiveMuseumMembership = () => ({
  type: ACTIONS.REDIR_RCV_MUS_TKT
});

export const redirectToMuseumMembershipRequirement = () => ({
  type: ACTIONS.REDIR_MUS_TKT_PREREQ
});

export const redirectToMuseumMembershipReceived = () => ({
  type: ACTIONS.REDIR_MUS_TKT_RCD
});

export const changeCityIdInfo = value => ({
  type: ACTIONS.CHANGE_CITY_ID_INFO,
  value
});
