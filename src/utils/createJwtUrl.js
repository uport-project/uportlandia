import jwtToUrl from "../utils/jwtToUrl";

async function createJwtUrl(jwt, redirectUrl, isMobile) {
  const liteqr = Boolean(sessionStorage.getItem("uPortlandia_liteqr"));
  if(isMobile) {
    return `https://id.uport.me/req/${jwt}?callback_type=redirect&redirect_url=${redirectUrl}`;
  }
  if(liteqr) {
    return await jwtToUrl(jwt);
  }
  return `me.uport:req/${jwt}`;
}

export default createJwtUrl;
