import * as ACTIONS from "../constants/actions";

const initialState = {
  callbackId: null,
  url: null,
  profile: null
};

const uportLoginReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.REQ_DISCLOSURE:
      return {
        ...initialState,
        callbackId: action.callbackId
      };

    case ACTIONS.REQ_DISCLOSURE_OK:
      return {
        ...state,
        callbackId: action.callbackId,
        url: action.url
      };

    case ACTIONS.CRED_VERIFY_OK:
    case ACTIONS.LOAD_PROFILE_OK:
      return {
        ...state,
        profile: action.value
      };
  }
  return state;
};

export default uportLoginReducer;
