import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col, Spacer, medium } from "../shared/grid";
import { InvLinkButton } from "../shared/elements";
import getDependentServices from "../../utils/getDependentServices";
import LikeDemo from "../shared/LikeDemo";
import Card from "../shared/ServiceCard";
import Footer from "../shared/Footer";
import SERVICES from "../../constants/services";

class ClaimExists extends React.Component {
  render() {
    const deps = getDependentServices(SERVICES.CITY_ID.id);
    return (<Wrapper>
      <TopHalf>
        <h2>It looks like you already have uPortlandia ID</h2>
        <Logo src={SERVICES.CITY_ID.icon} />
        <p>With your City ID you have easy and quick access to numerous
          services and programs in uPortlandia</p>
      </TopHalf>
      <BotHalf>
        <Grid>
          <Spacer span={1} />
          {deps.length
            ? <Col span={7}>
             <CardsLabel>Services that honor {SERVICES.CITY_ID.name}</CardsLabel>
            {deps.map(service => (
              <Card key={service.id}
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
                Back to Dashboard
              </InvLinkButton>
            </Center>
          </Col>
          : null}
          <Col span={deps.length ? 3 : 10}>
            <LikeDemo />
          </Col>
        </Grid>
      </BotHalf>
      <Footer />
    </Wrapper>)
  }
}

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
