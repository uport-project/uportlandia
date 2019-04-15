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

class City extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title={SERVICES.DIPLOMA.entity} logo={SERVICES.DIPLOMA.icon} />
      <Container>
        <Switch>
          <Route path="/university" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/university/prerequisites" exact>
            <React.Fragment>
              <BackButton url="/university" />
              <Failure
                heading="Services that issue claims required to get the diploma"
                services={SERVICES.DIPLOMA.requiredServices} />
            </React.Fragment>
          </Route>
          <Route path="/university/receive" exact component={Receive} />
          <Route path="/university/complete" exact>
            <React.Fragment>
              <BackButton url="/" label="Back to Home" />
              <Success id={SERVICES.DIPLOMA.id} />
            </React.Fragment>
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ContentLayout>)
  }
}

export default City;
