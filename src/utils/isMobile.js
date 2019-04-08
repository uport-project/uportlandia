import MobileDetect from "mobile-detect";

export default () => {
  const md = new MobileDetect(window.navigator.userAgent);
  return Boolean(md.mobile() || md.phone());
};
