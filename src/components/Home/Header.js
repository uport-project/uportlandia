import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { large, medium, mediumOnly } from "../shared/grid";
import * as theme from "../shared/theme";
import leftImageUpper from "../../images/home-header-01.svg";
import leftImageLower from "../../images/home-header-04.svg";
import rightImageUpper from "../../images/home-header-02.svg";
import rightImageLower from "../../images/home-header-03.svg";

class Header extends React.Component {
  render() {
    return (<Hero>
      <div className="skewed" />
      <LeftImageUpper src={leftImageUpper} />
      <LeftImageLower src={leftImageLower} />
      <RightImageUpper src={rightImageUpper} />
      <RightImageLower src={rightImageLower} />
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
    </Hero>);
  }
}

const Hero = styled.div`
  background: ${theme.gradient8};
  padding-bottom: 30vh;
  overflow: hidden;
  position: relative;

  .skewed {
    background: ${theme.gradient1};
    bottom: 0;
    height: 100vh;
    left: 0;
    position: absolute;
    right: 0;
    transform: skew(0, -5deg) translateY(80%);
    z-index: 3;
  }
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
  padding: 10vh 20px;
  position: relative;
  z-index: 2;
  text-align: center;
  ${medium("padding: 25vh 25vw 0;")}

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
const LeftImageUpper = styled.img`
  bottom: 12vh;
  display: none;
  left: 20px;
  position: absolute;
  z-index: 2;
  ${large("width: 24vw;")}
  ${medium("display: block;")}
  ${mediumOnly(`
    opacity: 0.7;
    width: 35vw;
  `)}
`;
const LeftImageLower = styled.img`
  bottom: calc(5vh + 2vw);
  display: none;
  left: 24vw;
  position: absolute;
  z-index: 4;
  ${large(`
    left: 20vw;
    width: 6vw;
  `)}
  ${medium(`
    display: block;
  `)}
  ${mediumOnly(`
    left: 28vw;
    opacity: 0.7;
  `)}
  @media all and (max-height: 450px) {
    display: none;
  }
`;
const RightImageUpper = styled.img`
  display: none;
  position: absolute;
  right: 20px;
  bottom: 10vh;
  z-index: 2;
  ${large("width: 24vw;")}
  ${medium("display: block;")}
  ${mediumOnly(`
    opacity: 0.7;
    width: 35vw;
  `)}
`;
const RightImageLower = styled.img`
  bottom: calc(5vh + 2vw);
  display: none;
  position: absolute;
  right: 20px;
  z-index: 4;
  ${large(`
    width: 19vw;
  `)}
  ${medium(`
    display: block;
  `)}
  ${mediumOnly(`
    opacity: 0.7;
    width: 28vw;
  `)}
  @media all and (max-height: 600px) {
    display: none;
  }
`;

export default Header;
