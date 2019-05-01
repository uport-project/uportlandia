import React from "react";

import App from "../components/AppContainer";
import Museum from "../components/Museum";

const MuseumPage = props => {
  return (<App serviceId="MUSEUM">
    <Museum />
  </App>);
};

export default MuseumPage;
