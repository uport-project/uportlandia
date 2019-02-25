import { combineReducers } from "redux";

import cityIdInfo from "./cityIdInfo";
import loading from "./loading";
import navigateExternal from "./navigateExternal";
import showAppDownload from "./showAppDownload";
import uportLogin from "./uportLogin";
import uportMessages from "./uportMessages";
import uportVerification from "./uportVerification";

export default combineReducers({
  cityIdInfo,
  loading,
  navigateExternal,
  showAppDownload,
  uportLogin,
  uportMessages,
  uportVerification
});
