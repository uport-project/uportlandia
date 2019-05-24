import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton, ThemedExtLink } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import isMobile from "../../utils/isMobile";
import SuccessIcon from "../../images/smiley-face-city.svg";
import AttestationModal from "../uport/AttestationContainer";
import SERVICES from "../../constants/services";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToCityHome();
    } else if(!isValid(this.props.data).valid) {
      this.props.redirectToCityIdForm();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToCityIdReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { verification, data, redirectToCityIdReceived, t } = this.props;
    if(!this.props.isLoggedIn || !isValid(this.props.data).valid)
      return null;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.CITY_ID.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToCityIdReceived}
          >{t("cityIdStep4")}</ThemedExtLink>
        : <ThemedButton
            themeId={SERVICES.CITY_ID.id}
            className="long" secondary onClick={this.showAttestationModal}
          >
            {t("cityIdStep4")}
          </ThemedButton>}
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.CITY_ID} active={3} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("Good News!")}</h2>
            <p>{t("Your City ID is ready to be issued")}</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>{t("What's next?")}</h4>
            <p>
              {t("Let's make sure you have an access to your uPortlandia City ID whenever and wherever you need them")}
              {t(SERVICES.CITY_ID.entity)}
              {t("is going to send your new ID claims to your uPort app")}
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
        serviceId={SERVICES.CITY_ID.id}
        issuer={{
          heading: SERVICES.CITY_ID.displayName,
          subHeading: SERVICES.CITY_ID.entity,
          name: SERVICES.CITY_ID.entity,
          logo: SERVICES.CITY_ID.icon,
          colors: theme.colors[SERVICES.CITY_ID.id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES.CITY_ID.generatedClaims.map(c => ({
          name: c.name,
          value: data[c.id]
        }))}
        show={data && attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.CITY_ID.claim]: data
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
