import * as ACTIONS from "../constants/actions";

const initialState = {};

const cityIdInfoReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.CHANGE_REGN_INFO:
      return {
        ...initialState,
        ...action.value
      };
    default:
      return state;
  }
};

export default cityIdInfoReducer;
