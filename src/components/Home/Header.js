/* eslint react/jsx-no-target-blank: 0 */

import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import { large, medium, mediumOnly } from "../shared/grid";
import * as theme from "../shared/theme";
import { CapsuleLinkButton, CapsuleHeading } from "../shared/elements";
import collectCredIcon from "../../images/collect-cred-icon.png";
import uPortAppIcon from "../../images/uport-app-icon.svg";
import servicesIcon from "../../images/services-icon.png";
import audienceImage from "../../images/audience-user.svg";

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
        <h1>{home.name}</h1>
        <p>{t("tryDemo")}.</p>
      </Hero.Welcome>
      <Audience>
        <Audience.Heading>{t("Who it's for")}</Audience.Heading>
        <Audience.Content>
          <Audience.Text>
            <p>{t("Customers like Monica")}</p>
            <p>{t("Monica loves driving")}</p>
            <p>{t("Be like Monica")}</p>
          </Audience.Text>
          <Audience.Image src={audienceImage} />
        </Audience.Content>
      </Audience>
      <Hero.Content>
        <CapsuleHeading>{t("How it works")}</CapsuleHeading>
        <Hero.Steps>
          <Hero.Step>
            <Hero.Step.Icon src={collectCredIcon} />
            <h4>{t("Collect your credentials")}</h4>
            <p>{t("Receive your identity verification with one click")}</p>
          </Hero.Step>
          <Hero.Step>
            <Hero.Step.Icon src={uPortAppIcon} />
            <h4>{t("Store it in the uport app")}</h4>
            <p>{t("Own your information")}</p>
          </Hero.Step>
          <Hero.Step>
            <Hero.Step.Icon src={servicesIcon} />
            <h4>{t("Get access to other services")}</h4>
            <p>{t("Enjoy perks and benefits")}</p>
          </Hero.Step>
        </Hero.Steps>
      </Hero.Content>
    </Hero>);
  }
}

const Hero = styled.div`
  background: ${theme.homeHeader.bg};
  color: ${theme.homeHeader.textColor};
  overflow: hidden;
  position: relative;
`;
Hero.Content = styled.div`
  background: ${theme.homeHeader.heroContentBg};
  color: ${theme.homeHeader.heroContentText};
  padding: 100px 20px;
  position: relative;
  z-index: 2;
  ${medium("padding: 100px 10vw;")}

  ${CapsuleHeading} {
    background: ${theme.homeHeader.heroContentBg};
    color: ${theme.homeHeader.heroContentText};
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
  height: 120px;
`;
Hero.Welcome = styled.div`
  padding: 2vh 20px 10vh;
  position: relative;
  z-index: 2;
  text-align: center;
  ${medium(`
    margin: 0 auto;
    padding: 5vh 0 100px;
    width: 660px;
  `)}

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
    font-size: ${18/16}rem;
    font-weight: 400;
    line-height: 1.75;
  }

  ${CapsuleLinkButton} {
    font-size: 1rem;
    margin-top: 20px;
  }
`;
const Logo = styled.img`
  display: block;
  height: 40px;
  margin: 10px auto 70px;
`;
const Audience = styled.div`
  background: ${theme.homeHeader.audienceBg};
  color: ${theme.homeHeader.audienceText};
  position: relative;
  z-index: 2;
  ${medium(`
    padding: 5vh 10vw 5vh;
  `)}
`;
Audience.Heading = styled(CapsuleHeading)`
  background: ${theme.homeHeader.audienceBg};
  color: ${theme.homeHeader.audienceText};
  `;
Audience.Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 100px 0;
  text-align: center;

  ${medium(`
    flex-direction: row;
    text-align: left;
  `)}
`;
Audience.Text = styled.div`
  p {
    margin: 2rem;
  }
  ${medium(`
    flex: 2;
    padding-right: 8rem;
    p {
      margin: 2rem 0;
    }
  `)}
`;
Audience.Image = styled.img`
  margin: 0 auto;
  max-width: 60vw;
  transform: translateX(10%);
  ${medium(`
    flex: 1;
    max-width: 100%;
    transform: none;
  `)}
`;

export default withTranslation()(Header);

