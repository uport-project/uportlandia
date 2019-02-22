import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button, Sidebar, DummyImage } from "../shared/elements";
import LoginModal from "../uport/LoginContainer";
import Logo from "../../images/pharmacy-logo.png";
import isValid from "../../utils/validateCityIdInfo";
import isValidInsurance from "../../utils/validateInsurance";

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
      const insurance = profile["Insurance"];
      if(isValid(cityID).valid && isValidInsurance(insurance)) {
        this.props.redirectToReceivePrescription();
      } else {
        this.props.redirectToPrescriptionRequirement();
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
        <Sidebar.Left span={3}>
          <DummyImage variant={1} />
          <DummyImage variant={2} />
          <DummyImage variant={3} />
        </Sidebar.Left>
        <Col span={6}>
          <Card CTA={CTA}>
          <h2>Get digital verification of your prescription</h2>
          <p>Get your medicines at any drug store you wish. No need to wait for the doctor to call your pharmacy.</p>
          <Box>
            <h3>Get your prescription claims in 3 easy steps:</h3>
            <ol>
              <li>Login with uPort</li>
              <li>Share your information: last name, first name, policy number,
                group number and dependencies</li>
              <li>Receive your prescription claims!</li>
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
          heading: "Prescription  Drug",
          subHeading: "Your Health Medical Center",
          name: "Your Health Medical Center",
          logo: Logo
        }}
        requestedClaims={[{
          name: "Cleverland City ID",
          request: true,
          hidden: true
        }, {
          name: "Insurance",
          request: true,
          hidden: true
        }, {
          name: "First Name",
          request: true
        }, {
          name: "Last Name",
          request: true
        }, {
          name: "Policy Number Name",
          request: true
        }, {
          name: "Group Number",
          request: true
        }, {
          name: "Dependencies",
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
