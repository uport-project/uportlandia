import { spawn } from "redux-saga/effects";

import credentials from "./credentials";
import pollChasqui from "./pollChasqui";
import storage from "./storage";

export default function* () {
  yield spawn(credentials);
  yield spawn(pollChasqui);
  yield spawn(storage);
}
