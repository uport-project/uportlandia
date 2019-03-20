import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import SERVICES from "../../constants/services";
import SuccessIcon from "../../images/smiley-face-museum.svg";
import AttestationModal from "../uport/AttestationContainer";

const claimData = {
  "Annual Membership": dayjs().format("YYYY")
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
      <Grid>
        <SidebarLeft service={SERVICES.MUSEUM} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your claims were succesfully shared with {SERVICES.MUSEUM.entity}</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your annual membership claims whenever
              and wherever you need them. {SERVICES.MUSEUM.entity} is going
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
          heading: SERVICES.MUSEUM.name,
          subHeading: SERVICES.MUSEUM.entity,
          name: SERVICES.MUSEUM.entity,
          logo: SERVICES.MUSEUM.icon,
          colors: theme.colors[SERVICES.MUSEUM.id]
        }}
        claimDetails={SERVICES.MUSEUM.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.MUSEUM.claim]: claimData
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
