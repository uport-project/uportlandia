import { spawn } from "redux-saga/effects";

import credentials from "./credentials";
import pollChasqui from "./pollChasqui";
import redirects from "./redirects";

export default function* () {
  yield spawn(credentials);
  yield spawn(pollChasqui);
  yield spawn(redirects);
}
