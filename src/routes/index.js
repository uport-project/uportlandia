import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../utils/history";
import HomePage from "../pages/Home";

export default () => (<Router history={history}>
  <Switch>
    <Route path="/" exact component={HomePage} />
  </Switch>
</Router>);
