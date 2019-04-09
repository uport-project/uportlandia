import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import Failure from "../shared/Failure";
import Receive from "./ReceiveContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import Footer from "../shared/Footer";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container } from "../shared/grid";
import SERVICES from "../../constants/services";

class Insurance extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title="People Care Insurance LLC." logo={SERVICES.INSURANCE.icon} />
      <Container>
        <Switch>
          <Route path="/insurance" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/insurance/prerequisites" exact>
            <React.Fragment>
              <BackButton url="/insurance" />
              <Failure
                heading="Services that issue claims required to get the insurance"
                services={SERVICES.INSURANCE.requiredServices} />
            </React.Fragment>
          </Route>
          <Route path="/insurance/receive" exact component={Receive} />
          <Route path="/insurance/complete" exact>
            <React.Fragment>
              <BackButton url="/" label="Back to Home" />
              <ClaimReceived />
            </React.Fragment>
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ContentLayout>)
  }
}

export default Insurance;
