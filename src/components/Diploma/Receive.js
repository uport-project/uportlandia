import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face.svg";
import AttestationModal from "../uport/AttestationContainer";
import UniLogo from "../../images/diploma-icon.svg";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToDiplomaHome();
    } else if(!isValid(this.props.cityIdClaim).valid) {
      this.props.redirectToDiplomaRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToDiplomaReceived();
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
    return (<Wrapper>
      <Card>
        <h2>Good News!</h2>
        <p>Your claims were succesfully shared with the Cleverland University.</p>

        <SuccessImage src={SuccessIcon} />
        <hr />
        <h4>What’s next?</h4>
        <p>
          Let’s make sure you have an access to your Diploma claims whenever
          and wherever you need them. The University of Cleverland is going
          to send your new claims to your uPort app.
        </p>
        <Button className="long" secondary onClick={this.showAttestationModal}>
          Receive your Diploma
        </Button>
      </Card>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: "Diploma",
          subHeading: "The University of Cleverland",
          name: "The University of Cleverland",
          logo: UniLogo
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={[{
          name: "School Name",
          value: "The University of Cleverland",
        }, {
          name: "Program Name",
          value: "French linguistics",
        }, {
          name: "Final Grades",
          value: "B+",
        }]}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          "Diploma": {
            "School Name": "The University of Cleverland",
            "Program Name": "French linguistics",
            "Final Grades": "B+",
            "Graduation Year": "2019"
          }
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
