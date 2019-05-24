import request from "./request";
import { CHASQUI_URL } from "../constants/config";
import createChasquiUrl from "../utils/createChasquiUrl";

async function jwtToUrl(jwt) {
  const response = await request(`${CHASQUI_URL}topic/`, {
    method: "post",
    dataType: "json",
    data: jwt
  });
  return createChasquiUrl(response.json.topicId);
}

export default jwtToUrl;
