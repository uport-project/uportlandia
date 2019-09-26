import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import * as actions from "../../actions";
import * as theme from "../shared/theme";
import { Button } from "../shared/elements";
import Services from "../shared/Services";
import { medium, Grid, Col } from "../shared/grid";
import Tooltip from "./ServiceCardTooltip";
import popupIcon from "../../images/popup-arrow.svg";

class HomeCard extends React.Component {
  promptAndRedirect = () => {
    this.props.navigateToServiceWebsite(this.props.url, this.props.superText);
  }
  render() {
    const {
      colors,
      displayName,
      icon,
      superText,
      description,
      shareClaims=[],
      shareServices=[],
      receiveClaims=[],
      getCTA,
      t
    } = this.props;

    const name = t(displayName || this.props.name);

    const theme = {
      mainHeading: {}
    };
    if(colors) {
      theme.mainHeading.color = colors.primary;
    }

    return (<Card className="service-card">
      <Content>
        <MainHeading style={theme.mainHeading}>{t(superText)}</MainHeading>
        <Grid>
          <Col span={7}>
            <Issuer>
              <Header>
                <Header.Icon src={icon} alt={name} />
                <Header.Name>{name}</Header.Name>
                <Header.Sub>
                  <Tooltip
                    display={`${receiveClaims.length} ${receiveClaims.length > 1 ? t("credentials included") : t("credential included")}`}
                    heading={`${t("credentials included in")} ${name}`}
                  >
                    <ul>
                      {receiveClaims.map(claim => (<Claim key={claim.name}>
                        <Claim.Name>{t(claim.displayName)}</Claim.Name>
                      </Claim>))}
                    </ul>
                  </Tooltip>
                </Header.Sub>
              </Header>
              <Description>{t(description)}</Description>
            </Issuer>
          </Col>
          <Col span={5}>
            <Issued>
            {shareServices.length
              ? <ShareClaims>
                  <Label>{t("youll be asked to share")}</Label>
                  <Services data={shareServices} type={Services.MINIMAL} />
                </ShareClaims>
              : <ShareClaims>
                <Label>{t("youll be asked to share")}</Label>
                <ClaimList>
                  {shareClaims.map(claim => (<li key={claim.name}>
                    {t(claim.name)}
                  </li>))}
                </ClaimList>
              </ShareClaims>}
              <Button onClick={this.promptAndRedirect}>
                <img src={popupIcon} alt="" />
                {getCTA
                  ? t(getCTA)
                  : `${t("getClaimLabel")} ${name}`}
              </Button>
            </Issued>
          </Col>
        </Grid>
      </Content>
    </Card>)
  }
}

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 50px rgba(50, 48, 57, 0.6);
  font-size: 0.875rem;
  line-height: 1.25;
  margin: 50px auto 0;
  max-width: 800px;
`;
const MainHeading = styled.h2`
  background: #EEEDF4;
  border-radius: 8px 8px 0 0;
  color: ${theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 8px 30px;
  text-transform: uppercase;
`;
const Content = styled.div`
  background: ${theme.main.bg};
  border-radius: 8px;
  position: relative;
  ${Button} {
    background: ${theme.colors.homeButtonBg};
    border-radius: 50px;
    display: block;
    height: 2.5rem;
    margin: 20px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    ${medium(`
      display: inline-block;
      white-space: nowrap;
    `)}
    img {
      display: none;
      margin: 0 0 -2px 10px;
      ${medium(`
        display: inline-block;
        float: right;
      `)}
    }
  }
  ${Button}:hover {
    background: ${theme.colors.homeButtonHoverBg};
  }
`;
const Issuer = styled.div`
  padding: 30px 30px 0;
  ${medium("padding: 30px;")}
`;
const Issued = styled.div`
  padding: 0 30px 30px;
  ${medium("padding: 30px 30px 30px 0;")}
`;
const Header = styled.div`;
  line-height: 1.5;
  text-align: center;
  ${medium(`
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 24fr 11fr;
    grid-gap: 5px 15px;
    line-height: 1;
    text-align: left;
  `)}
`;
Header.Icon = styled.img`
  border-radius: 15px;
  box-shadow: inset 0 0 2px rgba(114, 114, 114, 0.3);
  grid-area: 1 / 1 / 3 / 2;
  max-height: 100%;
  max-width: 100%;
`;
Header.Sup = styled.div`
  align-self: flex-end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 700;
  grid-area: 1 / 2 / 2 / 3;
  text-transform: uppercase;
`;
Header.Sub = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;
Header.Name = styled.h2`
  align-self: center;
  font-size: 1.5rem;
  font-weight: 600;
  grid-area: 1 / 2 / 2 / 3;
`;
const Description = styled.p`
  margin: 20px 0;
`;
const ClaimList = styled.ul`
  list-style-type: none;
  margin: 0;
  li {
    margin-bottom: 5px;
  }
`;
const Label = styled.div`
  color: ${theme.colors.text3};
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  & > a,
  & > span {
    font-size: 0.75rem;
    text-transform: uppercase;
  }
`;
const ShareClaims = styled.div`
  margin-bottom: 30px;
  ${medium(`
    margin: 0;
    padding-left: 10px;
  `)}
`;
const Claim = styled.li`
  & + & {
    margin-top: 5px;
  }
`;
Claim.Name = styled.div`
  margin-right: 5px;
`;
Claim.Type = styled.div`
  color: ${theme.colors.mutedText2};
`;
Claim.Entity = styled.div`
  color: ${theme.colors.mutedText2};
  font-size: 0.75rem;
`;
Claim.Entity.Name = styled.span`
  color: ${theme.colors.mutedText2};
  font-weight: 500;
`;

const mapDispatchToProps = dispatch => ({
  navigateToServiceWebsite(url, name) {
    dispatch(actions.navigateExternal(url, name));
  }
});

export default connect(undefined, mapDispatchToProps)(withTranslation()(HomeCard));
