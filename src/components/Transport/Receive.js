import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import isValidDiploma from "../../utils/validateDiploma";
import SuccessIcon from "../../images/smiley-face.svg";
import AttestationModal from "../uport/AttestationContainer";
import Logo from "../../images/transport-logo.png";

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
      diplomaClaim,
      redirectToBusTicketHome,
      redirectToBusTicketRequirement
    } = this.props;
    if(!isLoggedIn) {
      redirectToBusTicketHome();
    } else if(!isValid(cityIdClaim).valid || !isValidDiploma(diplomaClaim)) {
      redirectToBusTicketRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToBusTicketReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { cityIdClaim, diplomaClaim, isLoggedIn } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid || !isValidDiploma(diplomaClaim))
      return null;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={this.showAttestationModal}>
        Receive your Bus Ticket
      </Button>
    </Card.CTA>);

    return (<Wrapper>
      <Card CTA={CTA}>
        <h2>Good News!</h2>
        <p>Your claims were succesfully shared with Cleverland City Transit</p>
        <SuccessImage src={SuccessIcon} />
        <hr />
        <h4>What’s next?</h4>
        <p>
          Let’s make sure you have an access to your bus ticket claims whenever
          and wherever you need them. Cleverland City Transit is going
          to send your new claims to your uPort app.
        </p>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: "Monthly Bus Ticket",
          subHeading: "Cleverland City Transit",
          name: "Cleverland City Transit",
          logo: Logo
        }}
        claimDetails={[{
          name: "Monthly Bus Ticket",
          value: dayjs().format("MMM, YYYY"),
        }]}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          "BusTicket": {
            "Month": dayjs().format("MMM, YYYY"),
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
