import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import resourceBundle from "./constants/i18-resource";

const options = {
  fallbackLng: "en",
  debug: process.env.REACT_APP_TARGET_ENV !== "prod",
  interpolation: {
    escapeValue: false,
  },
  resources: resourceBundle
};

const presetLng = sessionStorage.getItem("uPortlandia_lng");
if(presetLng)
  options.lng = presetLng;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
