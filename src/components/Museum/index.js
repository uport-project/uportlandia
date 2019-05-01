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

class Insurance extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title={SERVICES.MUSEUM.entity} logo={SERVICES.TRANSPORT.icon} />
      <Container>
        <Switch>
          <Route path="/museum" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/museum/prerequisites" exact>
            <React.Fragment>
              <BackButton url="/museum" />
              <Failure
                heading="Services that issue claims required to get the annual membership"
                services={SERVICES.MUSEUM.requiredServices} />
            </React.Fragment>
          </Route>
          <Route path="/museum/receive" exact component={Receive} />
          <Route path="/museum/complete" exact>
            <React.Fragment>
              <BackButton url="/" label="Back to Home" />
              <Success id={SERVICES.MUSEUM.id} />
            </React.Fragment>
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ContentLayout>)
  }
}

export default Insurance;
