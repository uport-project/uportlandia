import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Body from "../shared/Body";
import Header from "./Header";
import * as theme from "../shared/theme";
import { Container, Grid, Col, medium } from "../shared/grid";
import Card from "./Card";
import HeroImage from "../../images/home-hero.png";
import SERVICES from "../../constants/services";

class Home extends React.Component {
  render() {
    return (<Wrapper>
      <Hero>
        <Hero.BannerContainer>
          <Hero.Banner src={HeroImage} />
        </Hero.BannerContainer>
        <Hero.Content>
          <h1>Welcome to Cleverland</h1>
          <p>
            In the smart city of the future, gone are the days of having to
            take time out of your day to stand in long lines to get anything
            accomplished. After creating your identity, everything from going
            to a doctor to visiting a museum can be done safely and securely
            from anywhere at any time from your uPort app.
          </p>
        </Hero.Content>
      </Hero>
      <Cards>
        <Container>
          {Object.keys(SERVICES).map(sid => <Card key={sid}
            name={SERVICES[sid].name}
            icon={SERVICES[sid].icon}
            superText={SERVICES[sid].entity}
            description={SERVICES[sid].description}
            shareClaims={SERVICES[sid].requiredClaims}
            receiveClaims={SERVICES[sid].generatedClaims}
            url={SERVICES[sid].url} />)}
        </Container>
      </Cards>
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const Hero = styled.div`
  background: ${theme.gradient1};
  position: relative;
`;
Hero.BannerContainer = styled.div`
  display: none;
  min-height: 300px;
  position: absolute;
  width: 100%;
  z-index: 1;
  ${medium("display: block;")}
`;
Hero.Banner = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
Hero.Content = styled.div`
  color: ${theme.homeHeader.textColor};
  position: relative;
  z-index: 2;
  text-align: center;

  ${Wrapper} & {
    padding: 10vh 20px;
    ${medium("padding: 25vh 25vw 25vh;")}
  }
  h1 {
    font-size: 2.375rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.5rem;
    line-height: 1.25;
  }
`;
const Cards = styled.div`
  background: ${theme.gradient1};

  ${Container} {
    padding: 40px 20px;
    ${medium("padding: 90px 0 40px;")}
  }
`;

export default Home;
