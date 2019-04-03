import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col, Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, Sidebar, DummyImage } from "../shared/elements";
import ServiceRequirements from "../shared/ServiceRequirements";
import SidebarLeft from "../shared/SidebarLeft";
import LoginModal from "../uport/LoginContainer";
import Logo from "../../images/company-logo.png";
import isValid from "../../utils/validateCityIdInfo";
import isDiplomaValid from "../../utils/validateDiploma";
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
    if(loginModal) {
      this.setState({ loginModal: false })
      const cityID = profile[SERVICES.CITY_ID.claim];
      const diploma = profile[SERVICES.DIPLOMA.claim];
      if(isValid(cityID).valid && isDiplomaValid(diploma)) {
        this.props.redirectToReceiveEmployment();
      } else {
        this.props.redirectToEmploymentRequirement();
      }
    }
  }
  render() {
    const { profile, redirectToCityIdForm } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      <LoginButton onClick={this.showLoginModal} />
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.COMPANY} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Get a digital verification of your employment</h2>
            <Bullets>
              <li>Share your employment information easily while you’re applying for a mortgage or signing a new lease.</li>
              <li>Provide a verified employment history during your job interview.</li>
            </Bullets>
            <ServiceRequirements service={SERVICES.COMPANY} />
          </Card>
        </Col>
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: SERVICES.COMPANY.name,
          subHeading: SERVICES.COMPANY.entity,
          name: SERVICES.COMPANY.entity,
          logo: SERVICES.COMPANY.icon,
          colors: theme.colors[SERVICES.COMPANY.id]
        }}
        requestedServices={SERVICES.COMPANY.requiredServices}
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

export default Landing;
