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
import { ContentLayout, BackButton } from "../shared/elements";
import { Container, Grid, Col } from "../shared/grid";
import CityLogo from "../../images/city-logo.png";

class City extends React.Component {
  render() {
    return (<ContentLayout>
      <Header title="The City of Cleverland" logo={CityLogo} />
      <Container>
        <Switch>
          <Route path="/city" exact>
            <React.Fragment>
              <BackButton url="/" />
              <Landing />
            </React.Fragment>
          </Route>
          <Route path="/city/login" exact>
            login
          </Route>
          <Route path="/city/personalinfo" exact>
            <React.Fragment>
              <BackButton url="/city" />
              <PersonalInfo />
            </React.Fragment>
          </Route>
          <Route path="/city/submitted" exact component={FormSubmitted} />
          <Route path="/city/complete" exact>
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
