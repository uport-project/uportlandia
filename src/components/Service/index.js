import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import Failure from "../shared/Failure";
import Receive from "./ReceiveContainer";
import Success from "../shared/Success";
import Footer from "../shared/Footer";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container } from "../shared/grid";
import SERVICES from "../../constants/services";

class ServicePage extends React.Component {
  render() {
    const { serviceId, basePath } = this.props;
    return (<ContentLayout>
      <Header title={SERVICES[serviceId].entity} logo={SERVICES[serviceId].icon} />
      <Container>
        <Switch>
          <Route path={basePath} exact render={() =>
            <React.Fragment>
              <BackButton url="/" />
              <Landing serviceId={serviceId} />
            </React.Fragment>} />
          <Route path={`${basePath}/prerequisites`} exact render={() =>
            <React.Fragment>
              <BackButton url={basePath} />
              <Failure
                heading={`Services that issue claims required to get the ${SERVICES[serviceId].name}`}
                services={SERVICES[serviceId].requiredServices} />
            </React.Fragment>} />
          <Route path={`${basePath}/receive`} exact render={() =>
            <Receive serviceId={serviceId} />} />
          <Route path={`${basePath}/complete`} exact render={() =>
            <React.Fragment>
              <BackButton url="/" label="Back to Home" />
              <Success id={SERVICES[serviceId].id} />
            </React.Fragment>} />
        </Switch>
      </Container>
      <Footer />
    </ContentLayout>)
  }
}

export default ServicePage;
