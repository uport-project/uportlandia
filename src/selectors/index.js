import { createSelector } from "reselect";

import SERVICES from "../constants/services";

export const isLoading = state => Boolean(state.loading.length);
export const getUPortMessages = state => state.uportMessages;
export const getUPortLogin = state => state.uportLogin;
export const getUPortProfile = createSelector(getUPortLogin, login => login.profile);
export const getUPortVerification = state => state.uportVerification;
export const isLoggedIn = createSelector(getUPortProfile, p => Boolean(p && p.did));
export const getRegnInfo = state => state.regnInfo;
export const showAppDownload = state => state.showAppDownload;
export const getExternalNavName = state => state.navigateExternal;
