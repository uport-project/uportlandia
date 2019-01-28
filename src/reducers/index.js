import { combineReducers } from "redux";

import loading from "./loading";
import uportLogin from "./uportLogin";
import uportMessages from "./uportMessages";

export default combineReducers({
  loading,
  uportLogin,
  uportMessages
});
