import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { withTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isValidDiploma from "../../utils/validateDiploma";
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/services";
import SuccessIcon from "../../images/smiley-face-transport.svg";
import AttestationModal from "../uport/AttestationContainer";

const claimData = {
  "Monthly Bus Ticket": dayjs().format("MMM, YYYY"),
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
    const { cityIdClaim, diplomaClaim, isLoggedIn, verification, redirectToBusTicketReceived, t } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid || !isValidDiploma(diplomaClaim))
      return null;

    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.TRANSPORT.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToBusTicketReceived}
          >{t("Receive your Bus Ticket")}</ThemedExtLink>
        : <ThemedButton
            themeId={SERVICES.TRANSPORT.id}
            className="long" secondary onClick={this.showAttestationModal}
          >
            {t("Receive your Bus Ticket")}
          </ThemedButton>}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.TRANSPORT} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("Good News!")}</h2>
            <p>
              {t("Your claims were succesfully shared with")}
              {" "}
              {t(SERVICES.TRANSPORT.entity)}
            </p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>{t("What's next?")}</h4>
            <p>
              {t("Let's make sure you have an access to your bus ticket claims whenever and wherever you need them")}.
              {" "}
              {t(SERVICES.TRANSPORT.entity)}
              {t("is going to send your new claims to your uPort app")}.
            </p>
          </Card>
        </Col>
        <Col span={3}>
        </Col>
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with"
        serviceId={SERVICES.TRANSPORT.id}
        issuer={{
          heading: SERVICES.TRANSPORT.name,
          subHeading: SERVICES.TRANSPORT.entity,
          name: SERVICES.TRANSPORT.entity,
          logo: SERVICES.TRANSPORT.icon,
          colors: theme.colors[SERVICES.TRANSPORT.id]
        }}
        claimDetails={SERVICES.TRANSPORT.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.TRANSPORT.claim]: claimData
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default withTranslation()(Receive);
