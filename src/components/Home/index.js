import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { showAppDownload } from "../../selectors";
import * as theme from "../shared/theme";
import { Container, medium } from "../shared/grid";
import { CapsuleHeading } from "../shared/elements";
import Header from "./Header";
import Step from "./Step";
import LearnMore from "./LearnMore";
import AppDownload from "./AppDownloadContainer";
import Card from "../shared/ServiceCard";
import { SERVICES } from "../../constants/config";

const Home = props => {
  const { showAppDownload } = props;
  const { t } = useTranslation();
  return (<Wrapper extraPadding={showAppDownload}>
    <Header />
    <Cards>
      <CapsuleHeading>{t("Ready? Lets do this")}</CapsuleHeading>
      <Container>
        {Object.keys(SERVICES).map(sid => (<React.Fragment key={sid}>
          <Step sid={sid} />
          <Card
            name={SERVICES[sid].displayName}
            icon={SERVICES[sid].icon}
            superText={SERVICES[sid].entity}
            description={SERVICES[sid].description}
            shareClaims={SERVICES[sid].requiredClaims}
            shareServices={SERVICES[sid].requiredServices}
            receiveClaims={SERVICES[sid].generatedClaims}
            getCTA={SERVICES[sid].getCTA}
            url={SERVICES[sid].url}
            colors={theme.colors[sid]} />
          </React.Fragment>))}
      </Container>
    </Cards>
    <LearnMore />
    <AppDownload />
  </Wrapper>)
};

const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}
`;
const Cards = styled.div`
  background: ${theme.homeCards.bg};
  padding-bottom: 5rem;
  position: relative;
  z-index: 2;

  ${CapsuleHeading} {
    background: ${theme.homeCards.bg};
    color: ${theme.homeCards.textColor};
  }
  ${Container} {
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }
`;

const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Home);
