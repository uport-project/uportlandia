import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import cityIdInfo from "./cityIdInfo";
import loading from "./loading";
import navigateExternal from "./navigateExternal";
import showAppDownload from "./showAppDownload";
import uportLogin from "./uportLogin";
import uportMessages from "./uportMessages";
import uportVerification from "./uportVerification";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    cityIdInfo,
    loading,
    navigateExternal,
    showAppDownload,
    uportLogin,
    uportMessages,
    uportVerification
  });
}

export default createRootReducer;
