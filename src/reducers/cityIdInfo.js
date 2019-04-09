import * as ACTIONS from "../constants/actions";

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  zipCode: "",
  country: "",
  dob: "",
  toc: false
};

const cityIdInfoReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.CHANGE_CITY_ID_INFO:
      return {
        ...initialState,
        ...action.value
      };
    default:
      return state;
  }
};

export default cityIdInfoReducer;
