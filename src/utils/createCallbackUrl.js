import MobileDetect from "mobile-detect";

const paramsToUrlFragment = (url, params = {}) => {
  const supported = ['data', 'id']
  return supported
    .filter(val => params[val])
    .reduce((uri = url, val) => `${uri}${/#/.test(uri) ? '&' : '#'}${val}=${encodeURIComponent(params[val])}`, url)
    .toString()
}

const createCallbackUrl = id => {
  const md = new MobileDetect(navigator.userAgent);
  const chromeAndIOS = (md.userAgent() === "Chrome" && md.os() === "iOS")
  const callback = chromeAndIOS
    ? `googlechrome:${window.location.href.substring(window.location.protocol.length)}`
    : window.location.href
  return paramsToUrlFragment(callback, {id})
}

export default createCallbackUrl;
