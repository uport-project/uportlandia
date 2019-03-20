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
import Logo from "../../images/company-logo.png";
import SERVICES from "../../constants/services";

class City extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title="Dream Job LLC." logo={Logo} />
      <Container>
        <Switch>
          <Route path="/company" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/company/prerequisites" exact>
            <React.Fragment>
              <BackButton url="/company" />
              <Failure
                heading="Services that issue claims required to get the employment verification"
                services={SERVICES.COMPANY.requiredServices} />
            </React.Fragment>
          </Route>
          <Route path="/company/receive" exact component={Receive} />
          <Route path="/company/complete" exact>
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

export default City;
