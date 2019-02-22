import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face.svg";
import AttestationModal from "../uport/AttestationContainer";
import CityLogo from "../../images/city-logo.png";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToCityHome();
    } else if(!isValid(this.props.data).valid) {
      this.props.redirectToCityIdForm();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToCityIdReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { data } = this.props;
    if(!this.props.isLoggedIn || !isValid(this.props.data).valid)
      return null;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={this.showAttestationModal}>
        Receive City ID
      </Button>
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <Col span={3}>
        </Col>
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your information has been succesfully verified. Your City ID is
              ready to be issued.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your Cleverland City ID
              whenever and wherever you need them. The City of Cleverland is
              going to send your new ID claims to your uPort app.
            </p>
          </Card>
        </Col>
        <Col span={3}>
        </Col>
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: "City ID",
          subHeading: "The City of Cleverland",
          name: "The City of Cleverland",
          logo: CityLogo
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={[{
          name: "First Name",
          value: data.firstName,
        }, {
          name: "Last Name",
          value: data.lastName,
        }, {
          name: "Date of Birth",
          value: data.dob,
        }]}
        show={data && attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          "Cleverland City ID": data
        }} />
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
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
