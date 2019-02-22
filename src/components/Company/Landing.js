import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col, Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button, Sidebar, DummyImage } from "../shared/elements";
import LoginModal from "../uport/LoginContainer";
import Logo from "../../images/company-logo.png";
import isValid from "../../utils/validateCityIdInfo";
import isDiplomaValid from "../../utils/validateDiploma";
import Dummy1 from "../../images/dummy-content-1.svg";
import Dummy2 from "../../images/dummy-content-2.svg";
import Dummy3 from "../../images/dummy-content-3.svg";
import Dummy4 from "../../images/dummy-content-4.svg";

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
      const cityID = profile["Cleverland City ID"];
      const diploma = profile["Diploma"];
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
      <Button className="long" secondary onClick={this.showLoginModal}>
        Share Your Information
      </Button>
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
            <h2>Get a digital verification of your employment</h2>
            <ul>
              <li>Share your employment information easily while you’re applying for a mortgage or signing a new lease.</li>
              <li>Provide a verified employment history during your job interview.</li>
            </ul>
            <Box>
              <h3>Get your employment claims in 3 easy steps:</h3>
              <ol>
                <li>Login with uPort</li>
                <li>Share your information: last name, first name, school name,
                  program name and final grades</li>
                <li>Receive your employment claims!</li>
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
          heading: "Employment Verification",
          subHeading: "Dream Job LLC.",
          name: "Dream Job LLC.",
          logo: Logo
        }}
        requestedClaims={[{
          name: "Cleverland City ID",
          request: true,
          hidden: true
        }, {
          name: "Diploma",
          request: true,
          hidden: true
        }, {
          name: "First Name",
          request: true
        }, {
          name: "Last Name",
          request: true
        }, {
          name: "School Name",
          request: true
        }, {
          name: "Program Name",
          request: true
        }, {
          name: "Final Grades",
          request: true
        }]}
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
