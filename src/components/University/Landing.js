import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

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
      const receivedClaim = profile[SERVICES.CITY_ID.claim];
      if(isValid(receivedClaim).valid) {
        this.props.redirectToReceiveDiploma();
      } else {
        this.props.redirectToDiplomaRequirement();
      }
    }
  }
  render() {
    const { login, t } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <LoginLink href={login.url} />
        : <LoginButton onClick={this.showLoginModal} />}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.DIPLOMA} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("Get a digital verification of your diploma")}</h2>
            <Bullets>
              <li>{t("Share your educational information easily")}</li>
              <li>{t("Get discounts or free access to services and programs")}</li>
            </Bullets>
            <ServiceRequirements service={SERVICES.DIPLOMA} />
          </Card>
        </Col>
        <Col span={3} />
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with the uPort app"
        infoHeading="You're logging in to"
        serviceId={SERVICES.DIPLOMA.id}
        issuer={{
          heading: SERVICES.DIPLOMA.displayName,
          subHeading: SERVICES.DIPLOMA.entity,
          name: SERVICES.DIPLOMA.entity,
          logo: SERVICES.DIPLOMA.icon,
          colors: theme.colors[SERVICES.DIPLOMA.id]
        }}
        requestedServices={SERVICES.DIPLOMA.requiredServices}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const Bullets = styled.ul`
  list-style: disc;
  margin-left: 20px;
  li + li {
    margin-top: 15px;
  }
`;

export default withTranslation()(Landing);
