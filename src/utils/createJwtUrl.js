import jwtToUrl from "../utils/jwtToUrl";

async function createJwtUrl(jwt, redirectUrl, isMobile) {
  const universalLinks = Boolean(sessionStorage.getItem("uPortlandia_universal_links"));
  let baseUrl = "me.uport:req/";
  if(universalLinks) {
    baseUrl = "https://id.uport.me/req/";
  }
  if(isMobile) {
    return `${baseUrl}${jwt}?callback_type=redirect&redirect_url=${redirectUrl}`;
  }
  return await jwtToUrl(jwt);
}

export default createJwtUrl;
