import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col, Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button, Sidebar, DummyImage } from "../shared/elements";
import LoginModal from "../uport/LoginContainer";
import CityLogo from "../../images/city-logo.png";

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
      this.props.redirectToCityIdForm();
    }
  }
  render() {
    const { profile, redirectToCityIdForm } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      {profile && profile.did
        ? <Button className="long" secondary onClick={redirectToCityIdForm}>Continue</Button>
        : <Button className="long" secondary onClick={this.showLoginModal}>Log In</Button>}
      </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <Col span={3}>
          <Sidebar.Left>
            <DummyImage variant={1} />
            <DummyImage variant={2} />
            <DummyImage variant={3} />
          </Sidebar.Left>
        </Col>
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Join thousands of fellow Cleverland citizens!</h2>
            <ul>
              <li>Get things done without leaving your home. No more standing in
                lines!</li>
              <li>Access services and programs offered by the City as well as by
                businesses</li>
              <li>Get  a free one-year membership at many of the City's leading
                museums, zoos, concert halls, and botanical gardens</li>
            </ul>
            <Box>
              <h3>Get your City ID claims in 4 easy steps:</h3>
              <ol>
                <li>Login with uPort</li>
                <li>Enter your information: last name, first name, address and date
                  of birth</li>
                <li>Submit for immediate verification</li>
                <li>Receive your City ID!</li>
              </ol>
            </Box>
          </Card>
        </Col>
        <Col span={3}>
          <Sidebar.Right>
            <DummyImage variant={4} />
            <DummyImage variant={3} />
          </Sidebar.Right>
        </Col>
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: "City ID",
          subHeading: "The City of Cleverland",
          name: "The City of Cleverland",
          logo: CityLogo
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
const Box = styled.div`
  background-color: ${theme.colors.lightBg};
  margin-top: 36px;
  padding: 20px;

  h3 {
    font-weight: 600;
    margin-bottom: 22px;
  }
  ol {
    list-style-type: decimal;
    margin-left: 20px;

    li + li {
      margin-top: 22px;
    }
  }
`;

export default Landing;
