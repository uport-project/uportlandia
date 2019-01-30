import * as ACTIONS from '../constants/actions'

const initialState = {
  callbackId: null,
  url: null,
  isPush: false
};

const uportVerificationReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SEND_VERIF:
      return {
        ...initialState,
        callbackId: action.callbackId
      };

    case ACTIONS.SEND_VERIF_OK:
      return {
        ...state,
        callbackId: action.callbackId,
        url: action.url,
        isPush: action.isPush
      };

    case ACTIONS.SEND_VERIF_ERR:
      return {
        ...initialState,
        error: action.error
      };
  }
  return state;
}

export default uportVerificationReducer;
