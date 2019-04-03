import { createSelector } from "reselect";

import * as  ACTIONS from "../constants/actions";
import SERVICES from "../constants/services";

export const isLoading = state => Boolean(state.loading.length);
export const getUPortMessages = state => state.uportMessages;
export const getUPortLogin = state => state.uportLogin;
export const getUPortProfile = createSelector(getUPortLogin, login => login.profile);
export const getUPortVerification = state => state.uportVerification;
export const isLoggedIn = createSelector(getUPortProfile, p => Boolean(p && p.did));
export const getCityIdInfo = state => state.cityIdInfo;
export const getCityIdClaim = createSelector(getUPortProfile, p => p && p[SERVICES.CITY_ID.claim]);
export const getDiplomaClaim = createSelector(getUPortProfile, p => p && p[SERVICES.DIPLOMA.claim]);
export const getEmploymentClaim = createSelector(getUPortProfile, p => p && p[SERVICES.COMPANY.claim]);
export const getInsuranceClaim = createSelector(getUPortProfile, p => p && p[SERVICES.INSURANCE.claim]);
export const getBusTicketClaim = createSelector(getUPortProfile, p => p && p[SERVICES.TRANSPORT.claim]);
export const showAppDownload = state => state.showAppDownload;
export const getExternalNavName = state => state.navigateExternal;
