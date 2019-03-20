import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isValidInsurance from "../../utils/validateInsurance";
import SERVICES from "../../constants/services";
import SuccessIcon from "../../images/smiley-face-pharmacy.svg";
import AttestationModal from "../uport/AttestationContainer";

const claimData = {
  "Prescription Drug": "Yes"
};

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
      insuranceClaim,
      redirectToPrescriptionHome,
      redirectToPrescriptionRequirement
    } = this.props;
    if(!isLoggedIn) {
      redirectToPrescriptionHome();
    } else if(!isValid(cityIdClaim).valid || !isValidInsurance(insuranceClaim)) {
      redirectToPrescriptionRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToPrescriptionReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { cityIdClaim, insuranceClaim, isLoggedIn } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid || !isValidInsurance(insuranceClaim))
      return null;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={this.showAttestationModal}>
        Receive your Prescription Claim
      </Button>
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.PHARMACY} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your claims were succesfully shared with Your Health Medical Center</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your prescription claims whenever
              and wherever you need them. Your Health Medical Center is going
              to send your new claims to your uPort app.
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
          heading: SERVICES.PHARMACY.name,
          subHeading: SERVICES.PHARMACY.entity,
          name: SERVICES.PHARMACY.entity,
          logo: SERVICES.PHARMACY.icon,
          colors: theme.colors[SERVICES.PHARMACY.id]
        }}
        claimDetails={SERVICES.PHARMACY.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.PHARMACY.claim]: claimData
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Receive;
