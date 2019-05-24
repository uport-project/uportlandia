import React from "react";

import App from "../components/AppContainer";
import City from "../components/City";

const CityPage = props => {
  return (<App serviceId="CITY_ID">
    <City />
  </App>);
};

export default CityPage;
