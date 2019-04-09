import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isValidEmployment from "../../utils/validateEmployment";
import isMobile from "../../utils/isMobile";
import SuccessIcon from "../../images/smiley-face-insurance.svg";
import AttestationModal from "../uport/AttestationContainer";
import SERVICES from "../../constants/services";

const claimData = {
  "Policy Number": "0000",
  "Group Number": "G-01",
  "Dependencies": "... deps ..."
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
      employmentClaim,
      redirectToInsuranceHome,
      redirectToInsuranceRequirement
    } = this.props;
    if(!isLoggedIn) {
      redirectToInsuranceHome();
    } else if(!isValid(cityIdClaim).valid || !isValidEmployment(employmentClaim)) {
      redirectToInsuranceRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToInsuranceReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { verification, cityIdClaim, employmentClaim, isLoggedIn, redirectToInsuranceReceived } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid || !isValidEmployment(employmentClaim))
      return null;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.INSURANCE.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToInsuranceReceived}
          >Receive your Insurance Coverage</ThemedExtLink>
        : <ThemedButton
            themeId={SERVICES.INSURANCE.id}
            className="long" secondary onClick={this.showAttestationModal}
          >
            Receive your Insurance Coverage
          </ThemedButton>}
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.INSURANCE} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your claims were succesfully shared with People Care Insurance LLC.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your insurance claims whenever
              and wherever you need them. People Care Insurance LLC. is going
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
          heading: SERVICES.INSURANCE.name,
          subHeading: SERVICES.INSURANCE.entity,
          name: SERVICES.INSURANCE.entity,
          logo: SERVICES.INSURANCE.icon,
          colors: theme.colors[SERVICES.INSURANCE.id]
        }}
        claimDetails={SERVICES.INSURANCE.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.INSURANCE.claim]: claimData
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
