import React from "react";
import { Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../shared/Header";
import Landing from "./LandingContainer";
import PersonalInfo from "./PersonalInfoContainer";
import Receive from "./ReceiveContainer";
import Success from "../shared/Success";
import ClaimExists from "./ClaimExists";
import Footer from "../shared/Footer";
import { ContentLayout, BackButton } from "../shared/elements";
import { Container } from "../shared/grid";
import SERVICES from "../../constants/services";

const City = () => {
  const { t } = useTranslation();
  return (<ContentLayout>
    <Header title={SERVICES.CITY_ID.entity} logo={SERVICES.CITY_ID.icon} />
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
        <Route path="/city/submitted" exact component={Receive} />
        <Route path="/city/complete" exact>
          <React.Fragment>
            <BackButton url="/" label={t("Back to Home")} />
            <Success id={SERVICES.CITY_ID.id} />
          </React.Fragment>
        </Route>
        <Route path="/city/exists" exact>
          <React.Fragment>
            <BackButton url="/" label={t("Back to Home")} />
            <ClaimExists />
          </React.Fragment>
        </Route>
      </Switch>
    </Container>
    <Footer />
  </ContentLayout>)
};

export default City;
