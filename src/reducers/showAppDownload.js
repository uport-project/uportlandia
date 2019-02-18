import { HIDE_APP_DL } from "../constants/actions";

const initialState = true;

export default (state=initialState, action) => {
  const { type } = action;
  switch(type) {
    case HIDE_APP_DL:
      return false;

    default:
      return state;
  }
};
