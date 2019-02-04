import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import PersonalInfo from "./PersonalInfoContainer";
import FormSubmitted from "./SubmittedContainer";
import ClaimReceived from "./ClaimReceivedContainer";
import Footer from "../shared/Footer";
import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import CityLogo from "../../images/city-logo.png";

class City extends React.Component {
  render() {
    return (<Wrapper>
      <Header title="The City of Cleverland" logo={CityLogo} />
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
  grid-template-rows: 80px 1fr 40px;
`;

export default City;
