import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import Prerequisites from "./Prerequisites";
import Receive from "./ReceiveContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import Footer from "../shared/Footer";
import * as theme from "../shared/theme";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container, Grid, Col } from "../shared/grid";
import Logo from "../../images/museum-logo.png";

class Insurance extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title="Cleverland Museum of Modern Art" logo={Logo} />
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
              <Prerequisites />
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
