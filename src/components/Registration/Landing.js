import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import ServiceRequirements from "../shared/ServiceRequirements";
import LoginModal from "../uport/LoginContainer";
import isMobile from "../../utils/isMobile";
import { SERVICES, registration } from "../../constants/config";

const { serviceId } = registration;

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
      this.props.redirectToRegnForm();
    }
  }
  render() {
    const { login, profile, redirectToRegnForm, t } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {profile && profile.did
        ? <LoginButton text={t("Continue")} onClick={redirectToRegnForm} />
        : isMobile()
          ? <LoginLink href={login.url} />
          : <LoginButton onClick={this.showLoginModal} />}
      </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES[serviceId]} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("regnLandingHeading")}</h2>
            <ul>
              {registration.text.landingSteps.map(step => <li key={step}>
                {t(step)}
              </li>)}
            </ul>
            <ServiceRequirements service={SERVICES[serviceId]} />
          </Card>
        </Col>
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with the uPort app"
        infoHeading="You're logging in to"
        serviceId={serviceId}
        issuer={{
          heading: SERVICES[serviceId].name,
          subHeading: SERVICES[serviceId].entity,
          name: SERVICES[serviceId].entity,
          logo: SERVICES[serviceId].icon,
          colors: theme.colors[SERVICES[serviceId].id]
        }}
        hiddenRequests={[SERVICES[serviceId]]}
        onClose={this.hideLoginModal}
        onLoginSuccess={this.handleLoginSuccess} />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ul {
    list-style: disc;
    margin-left: 20px;
    li + li {
      margin-top: 15px;
    }
  }
`;

export default withTranslation()(Landing);
