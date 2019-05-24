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
      <Header title="Your Health Medical Center" logo={SERVICES.PHARMACY.icon} />
      <Container>
        <Switch>
          <Route path="/pharmacy" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/pharmacy/prerequisites" exact>
            <React.Fragment>
              <BackButton url="/pharmacy" />
              <Failure
                heading="Services that issue claims required to get the prescription drug"
                services={SERVICES.PHARMACY.requiredServices} />
            </React.Fragment>
          </Route>
          <Route path="/pharmacy/receive" exact component={Receive} />
          <Route path="/pharmacy/complete" exact>
            <React.Fragment>
              <BackButton url="/" label="Back to Home" />
              <Success id={SERVICES.PHARMACY.id} />
            </React.Fragment>
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ContentLayout>)
  }
}

export default Insurance;
