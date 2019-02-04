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
import { Container, Grid, Col } from "../shared/grid";
import UnivLogo from "../../images/university-logo.png";

class City extends React.Component {
  render() {
    return (<Wrapper>
      <Header title="The University of Cleverland" logo={UnivLogo} />
      <Container>
        <Switch>
          <Route path="/university" exact component={Landing} />
          <Route path="/university/prerequisites" exact component={Prerequisites} />
          <Route path="/university/receive" exact component={Receive} />
          <Route path="/university/complete" exact component={ClaimReceived} />
        </Switch>
      </Container>
      <Footer />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  background-color: ${theme.colors.lightBg2};
  min-height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr 40px;
`;

export default City;
