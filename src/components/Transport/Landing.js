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
import isValidDiploma from "../../utils/validateDiploma";
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
      const diploma = profile[SERVICES.DIPLOMA.claim];
      if(isValid(cityID).valid && isValidDiploma(diploma)) {
        this.props.redirectToReceiveBusTicket();
      } else {
        this.props.redirectToBusTicketRequirement();
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
        <SidebarLeft service={SERVICES.TRANSPORT} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Get digital verification of your bus ticket.</h2>
            <p>{SERVICES.CITY_ID.entity} provides free services for its
              citizens. Get your monthly bus ticket for free.</p>
            <ServiceRequirements service={SERVICES.TRANSPORT} />
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
          heading: SERVICES.TRANSPORT.name,
          subHeading: SERVICES.TRANSPORT.entity,
          name: SERVICES.TRANSPORT.entity,
          logo: SERVICES.TRANSPORT.icon,
          colors: theme.colors[SERVICES.TRANSPORT.id]
        }}
        requestedServices={SERVICES.TRANSPORT.requiredServices}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>);
  }
}

const Wrapper = styled.div``;

export default Landing;
