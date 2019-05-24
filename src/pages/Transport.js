import React from "react";

import App from "../components/AppContainer";
import Transport from "../components/Transport";

const TransportPage = props => {
  return (<App serviceId="TRANSPORT">
    <Transport />
  </App>);
};

export default TransportPage;
