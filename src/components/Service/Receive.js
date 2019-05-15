import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateReq";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/services";
import SuccessIcon from "../../images/smiley-face-diploma.svg";
import AttestationModal from "../uport/AttestationContainer";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    const {
      serviceId,
      isLoggedIn,
      profile,
      redirectToServiceHome,
      redirectToFailure
    } = this.props;
    if(!isLoggedIn) {
      redirectToServiceHome(serviceId);
    } else if(!isValid(SERVICES[serviceId], profile)) {
      redirectToFailure(serviceId);
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToClaimReceived(this.props.serviceId);
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const {
      isLoggedIn,
      profile,
      verification,
      serviceId,
      redirectToClaimReceived,
      t
    } = this.props;
    if(!isLoggedIn || !isValid(SERVICES[serviceId], profile))
      return <Redirect to={SERVICES[serviceId].url} />
    const { claimData } = SERVICES[serviceId];
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES[serviceId].id}
            className="long"
            secondary
            href={verification.url}
            onClick={() => redirectToClaimReceived(serviceId)}
          >Receive your {SERVICES[serviceId].name}</ThemedExtLink>
        : <ThemedButton themeId={SERVICES[serviceId].id} className="long" secondary onClick={this.showAttestationModal}>
            Receive your {SERVICES[serviceId].name}
          </ThemedButton>}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES[serviceId]} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("Good News!")}</h2>
            <p>{t("Your claims were succesfully shared with")} {t(SERVICES[serviceId].entity)}.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>{t("What's next?")}</h4>
            <p>
              {t("Let's make sure you have access to your claims whenever and wherever you need them")}
              {t(SERVICES[serviceId].entity)}
              {t("is going to send your new claims to your uPort app")}
            </p>
          </Card>
        </Col>
        <Col span={3} />
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with"
        serviceId={SERVICES[serviceId].id}
        issuer={{
          heading: SERVICES[serviceId].name,
          subHeading: SERVICES[serviceId].entity,
          name: SERVICES[serviceId].entity,
          logo: SERVICES[serviceId].icon,
          colors: theme.colors[SERVICES[serviceId].id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES[serviceId].generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES[serviceId].claim]: claimData
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default withTranslation()(Landing);
