import shortId from "shortid";

import { CHASQUI_URL } from "../constants/config";

export default (id=shortId.generate()) =>
  `${CHASQUI_URL}topic/${id}`;
