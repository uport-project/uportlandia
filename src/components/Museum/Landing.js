import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import ServiceRequirements from "../shared/ServiceRequirements";
import SidebarLeft from "../shared/SidebarLeft";
import LoginModal from "../uport/LoginContainer";
import isValid from "../../utils/validateCityIdInfo";
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
      if(isValid(cityID).valid) {
        this.props.redirectToReceiveMuseumMembership();
      } else {
        this.props.redirectToMuseumMembershipRequirement();
      }
    }
  }
  render() {
    const { login } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <LoginLink href={login.url} />
        : <LoginButton onClick={this.showLoginModal} />}
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.MUSEUM} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Get digital verification of your annual membership.</h2>
            <p>{SERVICES.CITY_ID.entity} provides free services for its citizens. Get your annual museum membership for free.</p>
            <ServiceRequirements service={SERVICES.MUSEUM} />
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
          heading: SERVICES.MUSEUM.name,
          subHeading: SERVICES.MUSEUM.entity,
          name: SERVICES.MUSEUM.entity,
          logo: SERVICES.MUSEUM.icon,
          colors: theme.colors[SERVICES.MUSEUM.id]
        }}
        requestedServices={SERVICES.MUSEUM.requiredServices}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;

export default Landing;
