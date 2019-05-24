import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Grid, Col, Spacer, medium } from "../shared/grid";
import { InvLinkButton } from "../shared/elements";
import getDependentServices from "../../utils/getDependentServices";
import Card from "../shared/ServiceCard";
import Footer from "../shared/Footer";
import { SERVICES, registration } from "../../constants/config";

const { serviceId } = registration;

const ClaimExists = () => {
  const { t } = useTranslation();
  const deps = getDependentServices(SERVICES[serviceId].id);
  return (<Wrapper>
    <TopHalf>
      <h2>{t("regnClaimExists")}</h2>
      <Logo src={SERVICES[serviceId].icon} />
      <p>{t("regnBenefits")}</p>
    </TopHalf>
    <BotHalf>
      <Grid>
        <Spacer span={2} />
        {deps.length
          ? <Col span={8}>
           <CardsLabel>{t("Services that honor")} {t(SERVICES[serviceId].displayName)}</CardsLabel>
          {deps.map(service => (
            <Card key={service.id}
              displayName={service.displayName}
              name={service.name}
              icon={service.icon}
              superText={service.entity}
              description={service.description}
              shareClaims={service.requiredClaims}
              shareServices={service.requiredServices}
              receiveClaims={service.generatedClaims}
              url={service.url}
              colors={theme.colors[service.id]} />))}
          <Center>
            <InvLinkButton secondary to="/">
              {t("Back to Dashboard")}
            </InvLinkButton>
          </Center>
        </Col>
        : null}
        <Spacer span={2} />
      </Grid>
    </BotHalf>
    <Footer />
  </Wrapper>)
};

const Wrapper = styled.div`
  background-color: ${theme.footer.bg};
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;

  footer {
    margin: 10px 0;
  }
  ${InvLinkButton} {
    margin: 30px auto;
  }
`;
const TopHalf = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  p {
    max-width: 600px;
  }
`;
const BotHalf = styled.div`
  background: ${theme.gradient1};
  padding: 30px 20px;
  position: relative;
  ${medium(`
    padding: 30px 0;
  `)};
`;
const CardsLabel = styled.h4`
  color: ${theme.colors.primaryButtonText};
  display: block
  font-size: 0.875rem;
  font-weight: 600;
  margin: 25px auto 0;
  max-width: 800px;
  text-transform: uppercase;
  & + .service-card {
    margin-top: calc(50px - 0.875rem - 25px);
  }
  ${medium(`
    height: 0.875rem;
  `)}
`;
const Logo = styled.img`
  border-radius: 10px;
  display: block;
  margin: 35px auto;
  max-width: 100%;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export default ClaimExists;
