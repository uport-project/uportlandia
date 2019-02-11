import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face.svg";
import AttestationModal from "../uport/AttestationContainer";
import Logo from "../../images/museum-logo.png";

class Receive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    const {
      isLoggedIn,
      cityIdClaim,
      redirectToMuseumMembershipHome,
      redirectToMuseumMembershipRequirement
    } = this.props;
    if(!isLoggedIn) {
      redirectToMuseumMembershipHome();
    } else if(!isValid(cityIdClaim).valid) {
      redirectToMuseumMembershipRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToMuseumMembershipReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { cityIdClaim, isLoggedIn } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid)
      return null;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={this.showAttestationModal}>
        Receive your Annual Membership
      </Button>
    </Card.CTA>);

    return (<Wrapper>
      <Card CTA={CTA}>
        <h2>Good News!</h2>
        <p>Your claims were succesfully shared with Cleverland Museum of Modern Art</p>
        <SuccessImage src={SuccessIcon} />
        <hr />
        <h4>What’s next?</h4>
        <p>
          Let’s make sure you have an access to your annual membership claims whenever
          and wherever you need them. Cleverland Museum of Modern Art is going
          to send your new claims to your uPort app.
        </p>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: "Annual Membership",
          subHeading: "Cleverland Museum of Modern Art",
          name: "Cleverland Museum of Modern Art",
          logo: Logo
        }}
        claimDetails={[{
          name: "Annual Membership",
          value: dayjs().format("YYYY"),
        }]}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          "MuseumMembership": {
            "Year": dayjs().format("YYYY"),
          }
        }} />
      </Card>
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

export default Receive;
