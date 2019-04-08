import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import ServiceRequirements from "../shared/ServiceRequirements";
import LoginModal from "../uport/LoginContainer";
import isValid from "../../utils/validateCityIdInfo";
import isValidInsurance from "../../utils/validateInsurance";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/services";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false
    };
  }
  hideLoginModal = () => {
    this.setState({ loginModal: false });
  }
  showLoginModal = () => {
    this.setState({ loginModal: true });
  }
  handleLoginSuccess = profile => {
    const { loginModal } = this.state;
    if(loginModal || isMobile()) {
      this.setState({ loginModal: false })
      const cityID = profile[SERVICES.CITY_ID.claim];
      const insurance = profile[SERVICES.INSURANCE.claim];
      if(isValid(cityID).valid && isValidInsurance(insurance)) {
        this.props.redirectToReceivePrescription();
      } else {
        this.props.redirectToPrescriptionRequirement();
      }
    }
  }
  render() {
    const { login, profile, redirectToCityIdForm } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <LoginLink href={login.url} />
        : <LoginButton onClick={this.showLoginModal} />}
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.PHARMACY} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
          <h2>Get digital verification of your prescription</h2>
          <p>Get your medicines at any drug store you wish. No need to wait for the doctor to call your pharmacy.</p>
          <ServiceRequirements service={SERVICES.PHARMACY} />
        </Card>
      </Col>
        <Col span={3} />
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: SERVICES.PHARMACY.name,
          subHeading: SERVICES.PHARMACY.entity,
          name: SERVICES.PHARMACY.entity,
          logo: SERVICES.PHARMACY.icon,
          colors: theme.colors[SERVICES.PHARMACY.id]
        }}
        requestedServices={SERVICES.PHARMACY.requiredServices}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;

export default Landing;
