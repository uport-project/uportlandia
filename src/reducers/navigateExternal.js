import * as ACTIONS from "../constants/actions";

const initialState = "";

const navigateExternalReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.NAV_EXTERNAL:
      return action.name;

    case ACTIONS.NAV_EXTERNAL_RESET:
      return initialState;
  }
  return state;
};

export default navigateExternalReducer;
