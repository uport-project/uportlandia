import * as ACTIONS from "../constants/actions";

export const setLoading = (id, status) => ({
  type: ACTIONS.IS_LOADING,
  id,
  status
});

export const stopPollChasqui = callbackId => ({
  type: ACTIONS.STOP_POLL_CHASQUI,
  callbackId
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

export const reqDisclosure = (serviceId, callbackId, requestedClaims, isMobile=false) => ({
  type: ACTIONS.REQ_DISCLOSURE,
  serviceId,
  callbackId,
  requestedClaims,
  isMobile
});

export const reqDisclosureSuccess = (callbackId, url) => ({
  type: ACTIONS.REQ_DISCLOSURE_OK,
  callbackId,
  url
});

export const verifyCredentials = (serviceId, token) => ({
  type: ACTIONS.CRED_VERIFY,
  serviceId,
  token
});

export const verifyCredentialsSuccess = value => ({
  type: ACTIONS.CRED_VERIFY_OK,
  value
});

export const sendVerification = (serviceId, callbackId, profile, claim, isMobile=false) => ({
  type: ACTIONS.SEND_VERIF,
  serviceId,
  callbackId,
  profile,
  claim,
  isMobile
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

export const redirectToFailure = serviceId => ({
  type: ACTIONS.REDIR_FAIL,
  serviceId
});

export const redirectToReceiveClaim = serviceId => ({
  type: ACTIONS.REDIR_RCV_CLAIM,
  serviceId
});

export const redirectToClaimReceived = serviceId => ({
  type: ACTIONS.REDIR_RCD_CLAIM,
  serviceId
});

export const redirectToServiceHome = serviceId => ({
  type: ACTIONS.REDIR_SERV_HOME,
  serviceId
});

export const redirectToRegnHome = () => ({
  type: ACTIONS.REDIR_REGN_HOME
});

export const redirectToRegnForm = () => ({
  type: ACTIONS.REDIR_REGN_FORM
});

export const redirectToRegnFormSubmit = () => ({
  type: ACTIONS.REDIR_REGN_FORM_SUB
});

export const redirectToRegnReceived = () => ({
  type: ACTIONS.REDIR_REGN_RCD
});

export const redirectToRegnExists = () => ({
  type: ACTIONS.REDIR_REGN_EXISTS
});

export const changeRegnInfo = value => ({
  type: ACTIONS.CHANGE_REGN_INFO,
  value
});

export const hideAppDownload = () => ({
  type: ACTIONS.HIDE_APP_DL
});

export const navigateExternal = (url, name) => ({
  type: ACTIONS.NAV_EXTERNAL,
  url,
  name
});

export const navigateExternalReset = () => ({
  type: ACTIONS.NAV_EXTERNAL_RESET
});

export const saveDid = did => ({
  type: ACTIONS.SAVE_DID,
  did
});

export const loadDid = () => ({
  type: ACTIONS.LOAD_DID
});

export const loadDidSuccess = did => ({
  type: ACTIONS.LOAD_DID_OK,
  did
});

export const loadDidFailure = error => ({
  type: ACTIONS.LOAD_DID_ERR,
  error
});
