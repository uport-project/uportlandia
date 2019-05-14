import React from "react";
import { Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import Form from "./FormContainer";
import Receive from "./ReceiveContainer";
import Success from "../shared/Success";
import ClaimExists from "./ClaimExists";
import Footer from "../shared/Footer";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container } from "../shared/grid";
import { registration } from "../../constants/config";
import SERVICES from "../../constants/services";

const { serviceId } = registration;

const Registration = () => {
  const { t } = useTranslation();
  return (<ContentLayout>
    <Header title={SERVICES[serviceId].entity} logo={SERVICES[serviceId].icon} />
    <Container>
      <Switch>
        <Route path={SERVICES[serviceId].url} exact render={() =>
          <React.Fragment>
            <BackButton url="/" />
            <Landing />
          </React.Fragment>}
        />
        <Route path={`${SERVICES[serviceId].url}/form`} exact render={() =>
          <React.Fragment>
            <BackButton url="/city" />
            <Form />
          </React.Fragment>}
        />
        <Route path={`${SERVICES[serviceId].url}/submitted`} exact render={() => <Receive />} />
        <Route path={`${SERVICES[serviceId].url}/complete`} exact render={() =>
          <React.Fragment>
            <BackButton url="/" label={t("Back to Home")} />
            <Success id={SERVICES[serviceId].id} />
          </React.Fragment>}
        />
        <Route path={`${SERVICES[serviceId].url}/exists`} exact render={() =>
          <React.Fragment>
            <BackButton url="/" label={t("Back to Home")} />
            <ClaimExists />
          </React.Fragment>}
        />
      </Switch>
    </Container>
    <Footer />
  </ContentLayout>)
};

export default Registration;
