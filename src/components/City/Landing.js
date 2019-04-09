import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { LoginButton, LoginLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import ServiceRequirements from "../shared/ServiceRequirements";
import LoginModal from "../uport/LoginContainer";
import SERVICES from "../../constants/services";
import isMobile from "../../utils/isMobile";

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
      this.props.redirectToCityIdForm();
    }
  }
  render() {
    const { login, profile, redirectToCityIdForm } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {profile && profile.did
        ? <LoginButton text="Continue" onClick={redirectToCityIdForm} />
        : isMobile()
          ? <LoginLink href={login.url} />
          : <LoginButton onClick={this.showLoginModal} />}
      </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.CITY_ID} active={0} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Join thousands of fellow uPortlandia citizens!</h2>
            <ul>
              <li>Get things done without leaving your home. No more standing in
                lines!</li>
              <li>Access services and programs offered by the City as well as by
                businesses</li>
              <li>Get  a free one-year membership at many of the City's leading
                museums, zoos, concert halls, and botanical gardens</li>
            </ul>
            <ServiceRequirements service={SERVICES.CITY_ID} />
          </Card>
        </Col>

      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: SERVICES.CITY_ID.name,
          subHeading: SERVICES.CITY_ID.entity,
          name: SERVICES.CITY_ID.entity,
          logo: SERVICES.CITY_ID.icon,
          colors: theme.colors[SERVICES.CITY_ID.id]
        }}
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

export default Landing;
