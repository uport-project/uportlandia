import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";
import Landing from "./LandingContainer";
import PersonalInfo from "./PersonalInfoContainer";
import FormSubmitted from "./SubmittedContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";

class City extends React.Component {
  render() {
    return (<Wrapper>
      <Header />
      <Container>
        <Switch>
          <Route path="/city" exact component={Landing} />
          <Route path="/city/login" exact>
            login
          </Route>
          <Route path="/city/personalinfo" exact component={PersonalInfo} />
          <Route path="/city/submitted" exact component={FormSubmitted} />
          <Route path="/city/complete" exact component={ClaimReceived} />
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
