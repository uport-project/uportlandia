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
import Logo from "../../images/pharmacy-logo.png";
import SERVICES from "../../constants/services";

class Insurance extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title="Your Health Medical Center" logo={Logo} />
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
