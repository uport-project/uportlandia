import request from "./request";
import CHASQUI_HOST from "../constants/chasquiUrl";
import createChasquiUrl from "../utils/createChasquiUrl";

async function jwtToUrl(jwt) {
  const response = await request(`${CHASQUI_HOST}topic/`, {
    method: "post",
    dataType: "json",
    data: jwt
  });
  return createChasquiUrl(response.json.topicId);
}

export default jwtToUrl;
