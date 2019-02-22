import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button, Sidebar, DummyImage } from "../shared/elements";
import LoginModal from "../uport/LoginContainer";
import Logo from "../../images/insurance-logo.png";
import isValid from "../../utils/validateCityIdInfo";
import isValidEmploment from "../../utils/validateEmployment";

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
      const employment = profile["Employment"];
      if(isValid(cityID).valid && isValidEmploment(employment)) {
        this.props.redirectToReceiveInsurance();
      } else {
        this.props.redirectToInsuranceRequirement();
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
            <h2>Insurance Coverage</h2>
            <p>Share your insurance information easily at your doctor’s office, pharmacy or at any emergency.</p>
            <Box>
              <h3>Get your Insurance claims in 3 easy steps:</h3>
              <ol>
                <li>Login with uPort</li>
                <li>Share your information: last name, first name, date of birth,
                  company name and date of employment</li>
                <li>Receive your insurance claims!</li>
              </ol>
            </Box>
          </Card>
        </Col>
        <Sidebar.Right span={3}>
          <DummyImage variant={4} />
          <DummyImage variant={3} />
        </Sidebar.Right>
      </Grid>
      <LoginModal
        show={loginModal}
        heading="First things first"
        description="To login scan the QR code with  the uPort app."
        infoHeading="You're logging in to"
        issuer={{
          heading: "Insurance Coverage",
          subHeading: "People Care LLC.",
          name: "People Care LLC.",
          logo: Logo
        }}
        requestedClaims={[{
          name: "Cleverland City ID",
          request: true,
          hidden: true
        }, {
          name: "Employment",
          request: true,
          hidden: true
        }, {
          name: "First Name",
          request: true
        }, {
          name: "Last Name",
          request: true
        }, {
          name: "Company Name",
          request: true
        }, {
          name: "Date of Employment",
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
