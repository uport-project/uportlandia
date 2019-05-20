/* eslint react/jsx-no-target-blank: 0 */

import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import { large, medium, mediumOnly } from "../shared/grid";
import * as theme from "../shared/theme";
import { CapsuleLinkButton } from "../shared/elements";
import cityIdIcon from "../../images/city-id-icon.svg";
import uPortAppIcon from "../../images/uport-app-icon.svg";
import servicesIcon from "../../images/services-icon.svg";

import { home } from "../../constants/config";

class Header extends React.Component {
  state = {
    devClickCount: 0
  }
  render() {
    const { t } = this.props;
    return (<Hero>
      <Hero.Welcome>
        <a href={home.logoLink} target="_blank">
          <Logo src={home.logo} />
        </a>
        <h2>{t("Welcome to")}</h2>
        <h1>{home.name}</h1>
        <p>{t("tryDemo")}.</p>
        <p>{t("Play around")}.</p>
        <CapsuleLinkButton to="/city">{t("Get Started")}</CapsuleLinkButton>
      </Hero.Welcome>
      <Hero.Content>
        <h3>{t("Its Simple")}</h3>
        <Hero.Steps>
          <Hero.Step>
            <Hero.Step.Icon src={cityIdIcon} />
            <h4>{t("getRegistration")}</h4>
            <p>{t("getRegistrationDescription")}</p>
          </Hero.Step>
          <Hero.Step>
            <Hero.Step.Icon src={uPortAppIcon} style={{ position: "relative", left: "-15px" }} />
            <h4>{t("Store it in the uport app")}</h4>
            <p>{t("Own your information")}</p>
          </Hero.Step>
          <Hero.Step>
            <Hero.Step.Icon src={servicesIcon} />
            <h4>{t("Get access to city services")}</h4>
            <p>{t("Enjoy perks and benefits")}</p>
          </Hero.Step>
        </Hero.Steps>
        <hr />
        <h3>{t("Ready? Lets do this")}</h3>
      </Hero.Content>
    </Hero>);
  }
}

const Hero = styled.div`
  overflow: hidden;
  position: relative;
`;
Hero.Content = styled.div`
  background: ${theme.gradient1};
  padding: 60px 20px 0;
  color: #fff;
  ${medium("padding: 60px 20vw 0;")}

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 60px;
    text-align: center;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    border: none;
    border-top: solid 1px #fff;
    height: 1px;
    margin: 80px auto;
    width:  120px;
  }
`;
Hero.Steps = styled.ul`
  align-items: baseline;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${medium("display: flex;")}
`;
Hero.Step = styled.li`
  flex: 1;
  & + & {
    margin: 60px 0 0;
  }
  text-align: center;
  ${medium(`
    & + & {
      margin: 0 0 0 40px;
    }
  `)}
  h4 {
    font-weight: 600;
    margin: 30px 0 10px;
  }
`;
Hero.Step.Icon = styled.img`

`;
Hero.Welcome = styled.div`
  background: ${theme.header.bg};
  background-size: cover;
  color: ${theme.homeHeader.textColor};
  padding: 2vh 20px 10vh;
  position: relative;
  z-index: 2;
  text-align: center;
  ${large("padding: 5vh 30vw 25vh;")}
  ${mediumOnly("padding: 5vh 25vw 25vh;")}

  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 15px;
    text-transform: uppercase;
    ${medium("font-size: 1.5rem;")}
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    ${medium("font-size: 4.25rem;")}
  }
  p {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    ${medium("font-size: 1.25rem;")}
  }

  ${CapsuleLinkButton} {
    font-size: 1rem;
    margin-top: 20px;
  }
`;
const Logo = styled.img`
  display: block;
  margin: 10px auto 70px;
  width: 128px;
`;

export default withTranslation()(Header);

