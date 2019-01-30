import { combineReducers } from "redux";

import cityIdInfo from "./cityIdInfo";
import loading from "./loading";
import uportLogin from "./uportLogin";
import uportMessages from "./uportMessages";
import uportVerification from "./uportVerification";

export default combineReducers({
  cityIdInfo,
  loading,
  uportLogin,
  uportMessages,
  uportVerification
});
