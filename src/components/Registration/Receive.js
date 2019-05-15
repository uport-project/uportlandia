import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateRegnClaim";
import isMobile from "../../utils/isMobile";
import SuccessIcon from "../../images/smiley-face-city.svg";
import AttestationModal from "../uport/AttestationContainer";
import SERVICES from "../../constants/services";
import { registration } from "../../constants/config";

const { serviceId } = registration;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToRegnHome();
    } else if(!isValid(this.props.data).valid) {
      this.props.redirectToRegnForm();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToRegnReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { verification, data, redirectToRegnReceived, t } = this.props;
    if(!this.props.isLoggedIn)
      return <Redirect to={SERVICES[serviceId].url} />;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES[serviceId].id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToRegnReceived}
          >{t("regnReceiveCTA")}</ThemedExtLink>
        : <ThemedButton
            themeId={SERVICES[serviceId].id}
            className="long" secondary onClick={this.showAttestationModal}
          >
            {t("regnReceiveCTA")}
          </ThemedButton>}
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES[serviceId]} active={3} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("regnSuccessHeading1")}</h2>
            <p>{t("regnSuccessText1")}</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>{t("regnSuccessHeading2")}</h4>
            <p>
              {t("regnSuccessText2")}
              {t(SERVICES[serviceId].entity)}
              {t("regnSuccessText3")}
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
        serviceId={SERVICES[serviceId].id}
        issuer={{
          heading: SERVICES[serviceId].displayName,
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
          value: data[c.id]
        }))}
        show={data && attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES[serviceId].claim]: data
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
