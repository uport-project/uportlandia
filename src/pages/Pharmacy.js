import React from "react";

import App from "../components/AppContainer";
import Pharmacy from "../components/Pharmacy";

const PharmacyPage = props => {
  return (<App serviceId="PHARMACY">
    <Pharmacy />
  </App>);
};

export default PharmacyPage;
