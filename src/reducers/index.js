import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import loading from "./loading";
import navigateExternal from "./navigateExternal";
import regnInfo from "./regnInfo";
import showAppDownload from "./showAppDownload";
import uportLogin from "./uportLogin";
import uportMessages from "./uportMessages";
import uportVerification from "./uportVerification";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    loading,
    navigateExternal,
    regnInfo,
    showAppDownload,
    uportLogin,
    uportMessages,
    uportVerification
  });
}

export default createRootReducer;
