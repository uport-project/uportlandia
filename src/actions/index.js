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

export const reqDisclosure = callbackId => ({
  type: ACTIONS.REQ_DISCLOSURE,
  callbackId
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
