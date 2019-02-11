import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import LoginModal from "../uport/LoginContainer";
import Logo from "../../images/transport-logo.png";
import isValid from "../../utils/validateCityIdInfo";
import isValidDiploma from "../../utils/validateDiploma";

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
      if(isValid(cityID).valid && isValidDiploma(diploma)) {
        this.props.redirectToReceiveBusTicket();
      } else {
        this.props.redirectToBusTicketRequirement();
      }
    }
  }
  render() {
    const { profile } = this.props;
    const { loginModal } = this.state;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={this.showLoginModal}>
        Share Your Information
      </Button>
    </Card.CTA>);

    return (<Wrapper>
      <Card CTA={CTA}>
        <h2>Get digital verification of your bus ticket.</h2>
        <p>The City of Cleverland provides free services for its citizens. Get your monthly bus ticket for free.</p>
        <Box>
          <h3>Get your bus ticket claims in 3 easy steps:</h3>
          <ol>
            <li>Login with uPort</li>
            <li>Share your information: last name, first name, address,
              date of birth and graduation year</li>
            <li>Receive your insurance claims!</li>
          </ol>
        </Box>
      </Card>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: "Monthly Bus Ticket",
          subHeading: "Cleverland City Transit",
          name: "Cleverland City Transit",
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
          request: false
        }, {
          name: "Last Name",
          request: false
        }, {
          name: "Address",
          request: false
        }, {
          name: "Date of Birth",
          request: false
        }, {
          name: "Graduation Year",
          request: false
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
