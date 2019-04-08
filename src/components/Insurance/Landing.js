import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import ServiceRequirements from "../shared/ServiceRequirements";
import SidebarLeft from "../shared/SidebarLeft";
import LoginModal from "../uport/LoginContainer";
import Logo from "../../images/insurance-logo.png";
import isValid from "../../utils/validateCityIdInfo";
import isValidEmploment from "../../utils/validateEmployment";
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
      const employment = profile[SERVICES.COMPANY.claim];
      if(isValid(cityID).valid && isValidEmploment(employment)) {
        this.props.redirectToReceiveInsurance();
      } else {
        this.props.redirectToInsuranceRequirement();
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
        <SidebarLeft service={SERVICES.INSURANCE} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Insurance Coverage</h2>
            <p>Share your insurance information easily at your doctor’s office, pharmacy or at any emergency.</p>
            <ServiceRequirements service={SERVICES.INSURANCE} />
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
          heading: SERVICES.INSURANCE.name,
          subHeading: SERVICES.INSURANCE.entity,
          name: SERVICES.INSURANCE.entity,
          logo: SERVICES.INSURANCE.icon,
          colors: theme.colors[SERVICES.INSURANCE.id]
        }}
        requestedServices={SERVICES.INSURANCE.requiredServices}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;

export default Landing;
