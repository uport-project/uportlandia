import SIGNER_STAGE from "./signer.stage";
import SIGNER_PROD from "./signer.prod";

const getSignerUrl = () => process.env.REACT_APP_TARGET_ENV === "production"
  ? SIGNER_PROD
  : process.env.REACT_APP_TARGET_ENV === "stage"
    ? SIGNER_STAGE
    : "http://localhost:3001/";

export default getSignerUrl;
