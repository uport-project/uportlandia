import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import HomePage from "../pages/Home";
import CityPage from "../pages/City";
import RedirectPage from "../pages/Redirect";
import Debug from "../pages/Debug";

import history from "../utils/history";
import { routes } from "../constants/config";
import App from "../components/AppContainer";
import Service from "../components/Service";

export default () => (<ConnectedRouter history={history}>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/city" component={CityPage} />
    <Route path="/redirect" component={RedirectPage} />
    <Route path="/_debug" exact component={Debug} />
    {routes.map(route => <Route path={route.path} key={route.serviceId} render={() =>
      <App serviceId={route.serviceId}>
        <Service serviceId={route.serviceId} basePath={route.path} />
      </App>} />)}
  </Switch>
</ConnectedRouter>);
