import React from "react";

import App from "../components/AppContainer";
import Company from "../components/Company";

const CompanyPage = props => {
  return (<App serviceId="COMPANY">
    <Company />
  </App>);
};

export default CompanyPage;
