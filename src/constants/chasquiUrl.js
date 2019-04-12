const getUrl = () => process.env.REACT_APP_TARGET_ENV === "production"
  ? "https://api.uport.me/chasqui/"
  : "https://api.uport.space/chasqui/";

export default getUrl();
