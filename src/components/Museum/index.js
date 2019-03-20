import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import Failure from "../shared/Failure";
import Receive from "./ReceiveContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import Footer from "../shared/Footer";
import * as theme from "../shared/theme";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container, Grid, Col } from "../shared/grid";
import Logo from "../../images/museum-logo.png";
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
