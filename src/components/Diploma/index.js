import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";
import Landing from "./LandingContainer";
import Prerequisites from "./Prerequisites";
import Receive from "./ReceiveContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";

class City extends React.Component {
  render() {
    return (<Wrapper>
      <Header />
      <Container>
        <Switch>
          <Route path="/diploma" exact component={Landing} />
          <Route path="/diploma/prerequisites" exact component={Prerequisites} />
          <Route path="/diploma/receive" exact component={Receive} />
          <Route path="/diploma/complete" exact component={ClaimReceived} />
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
  grid-template-rows: 80px auto auto;
`;

export default City;
