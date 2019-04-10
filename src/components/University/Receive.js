import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/services";
import SuccessIcon from "../../images/smiley-face-diploma.svg";
import AttestationModal from "../uport/AttestationContainer";

const claimData = {
  "School Name": SERVICES.DIPLOMA.entity,
  "Program Name": "French linguistics",
  "Graduation Year": "2019",
  "Final Grades": "B+"
};

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
    const { cityIdClaim, isLoggedIn, verification, redirectToDiplomaReceived } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid)
      return null;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.DIPLOMA.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToDiplomaReceived}
          >Receive your Diploma</ThemedExtLink>
        : <ThemedButton themeId={SERVICES.DIPLOMA.id} className="long" secondary onClick={this.showAttestationModal}>
            Receive your Diploma
          </ThemedButton>}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.DIPLOMA} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your claims were succesfully shared with the {SERVICES.DIPLOMA.entity}.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your Diploma claims whenever
              and wherever you need them. {SERVICES.DIPLOMA.entity} is going
              to send your new claims to your uPort app.
            </p>
          </Card>
        </Col>
        <Col span={3} />
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: SERVICES.DIPLOMA.name,
          subHeading: SERVICES.DIPLOMA.entity,
          name: SERVICES.DIPLOMA.entity,
          logo: SERVICES.DIPLOMA.icon,
          colors: theme.colors[SERVICES.DIPLOMA.id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES.DIPLOMA.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.DIPLOMA.claim]: claimData
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
