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
import isMobile from "../../utils/isMobile";
import SERVICES from "../../constants/services";
import SuccessIcon from "../../images/smiley-face-company.svg";
import AttestationModal from "../uport/AttestationContainer";

const claimData = {
  "Company Name": "Dream Job LLC.",
  "Salary": "$100,000",
  "Date of Employment": dayjs().format("MM/DD/YYYY")
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
      this.props.redirectToEmploymentHome();
    } else if(!isValid(this.props.cityIdClaim).valid) {
      this.props.redirectToEmploymentRequirement();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToEmploymentReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { verification, cityIdClaim, isLoggedIn, redirectToEmploymentReceived, t } = this.props;
    if(!isLoggedIn || !isValid(cityIdClaim).valid)
      return null;
    const CTA = () => (<Card.CTA>
      {isMobile()
        ? <ThemedExtLink themeId={SERVICES.COMPANY.id}
            className="long"
            secondary
            href={verification.url}
            onClick={redirectToEmploymentReceived}
          >{t("Receive your Employment Verification")}</ThemedExtLink>
        : <ThemedButton
            themeId={SERVICES.COMPANY.id}
            className="long" secondary onClick={this.showAttestationModal}
          >
            {t("Receive your Employment Verification")}
          </ThemedButton>}
    </Card.CTA>);

    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.COMPANY} active={2} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("Good News!")}</h2>
            <p>
              {t("Your claims were succesfully shared with")}
              {" "}
              {t(SERVICES.COMPANY.entity)}
            </p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              {t("Let's make sure you have an access to your employment claims whenever and wherever you need them")}
              {t(SERVICES.COMPANY.entity)}
              {" "}
              {t("is going to send your new claims to your uPort app")}
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
        serviceId={SERVICES.COMPANY.id}
        issuer={{
          heading: SERVICES.COMPANY.name,
          subHeading: SERVICES.COMPANY.entity,
          name: SERVICES.COMPANY.entity,
          logo: SERVICES.COMPANY.icon,
          colors: theme.colors[SERVICES.COMPANY.id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES.COMPANY.generatedClaims.map(c => ({
          name: c.name,
          value: claimData[c.name]
        }))}
        show={attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.COMPANY.claim]: claimData
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
