import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../utils/history";
import HomePage from "../pages/Home";
import CityPage from "../pages/City";
import UniversityPage from "../pages/University";
import CompanyPage from "../pages/Company";
import InsurancePage from "../pages/Insurance";
import PharmacyPage from "../pages/Pharmacy";
import TransportPage from "../pages/Transport";
import MuseumPage from "../pages/Museum";

export default () => (<Router history={history}>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/city" component={CityPage} />
    <Route path="/university" component={UniversityPage} />
    <Route path="/company" component={CompanyPage} />
    <Route path="/insurance" component={InsurancePage} />
    <Route path="/pharmacy" component={PharmacyPage} />
    <Route path="/transport" component={TransportPage} />
    <Route path="/museum" component={MuseumPage} />
  </Switch>
</Router>);
