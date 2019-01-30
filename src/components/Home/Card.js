import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { LinkButton } from "../shared/elements";
import { medium } from "../shared/grid";
import shareClaimIcon from "../../images/circle-arrow-up.svg";
import receiveClaimIcon from "../../images/circle-arrow-down.svg";

class HomeCard extends React.Component {
  render() {
    const {
      name,
      icon,
      superText,
      description,
      shareClaims,
      receiveClaims,
      onSubmit
    } = this.props;
    return (<Card>
      <Content>
        <Header>
          <Header.Icon src={icon} alt={name} />
          <Header.Sup>{superText}</Header.Sup>
          <Header.Name>{name}</Header.Name>
        </Header>
        <Description>{description}</Description>
        <ClaimLists>
          <ShareClaims>
            <ShareClaimsIcon />
            <Label>Claims to Share</Label>
            <ul>
              {shareClaims && shareClaims.length
                ? shareClaims.map(claim => (<Claim key={claim.name}>
                    <Claim.Name>{claim.name}</Claim.Name>
                    <Claim.Type>{claim.type}</Claim.Type>
                  </Claim>))
                : <Claim>
                    <Claim.Type>No claims requested</Claim.Type>
                  </Claim>}
            </ul>
          </ShareClaims>
          <ReceiveClaims>
            <ReceiveClaimsIcon />
            <Label>Claims You'll Receive</Label>
            <ul>
              {receiveClaims.map(claim => (<Claim key={claim.name}>
                <Claim.Name>{claim.name}</Claim.Name>
              </Claim>))}
            </ul>
          </ReceiveClaims>
        </ClaimLists>
        <LinkButton to="/city">Get Started</LinkButton>
      </Content>
      <AltColorBG />
    </Card>)
  }
}

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 2px 0px 1px rgba(188, 188, 188, 0.15);
  font-size: 0.875rem;
  line-height: 1.25;
  margin: 50px auto 0;
  max-width: 800px;
  ${medium(`
    display: grid;
    grid-template-columns: 4fr 1fr;
  `)}
`;
const Content = styled.div`
  background: ${theme.main.bg};
  border-radius: 8px;
  padding: 30px;
  position: relative;
  ul {
    list-style-type: none;
    margin: 10px 0 0;
    padding: 0;
  }
  ${LinkButton} {
    display: block;
    margin: 0 auto;
  }
  ${medium(`
    border-radius: 8px 0 0 8px;
    ${LinkButton} {
      bottom: 30px;
      margin: 0;
      position: absolute;
      right: -6rem;
    }
  `)}
`;
const AltColorBG = styled.div`
  background: ${theme.colors.cardAltBg};
  border-radius: 0 8px 8px 0;
  display: none;
  ${medium("display: block;")}
`;
const Header = styled.div`;
  line-height: 1.5;
  text-align: center;
  ${medium(`
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 11fr 24fr;
    grid-gap: 5px 15px;
    line-height: 1;
    text-align: left;
  `)}
`;
Header.Icon = styled.img`
  grid-area: 1 / 1 / 3 / 2;
`;
Header.Sup = styled.p`
  align-self: flex-end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 700;
  grid-area: 1 / 2 / 2 / 3;
  text-transform: uppercase;
`;
Header.Name = styled.h2`
  align-self: center;
  font-size: 1.5rem;
  font-weight: bold;
  grid-area: 2 / 2 / 3 / 3;
`;
const Description = styled.p`
  margin: 15px 0 35px;
`;
const ClaimLists = styled.div`
  ${medium(`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `)}
`;
const ShareClaimsIcon = styled.div`
  background: url(${shareClaimIcon}) center no-repeat;
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  width: 20px;
`;
const ReceiveClaimsIcon = styled(ShareClaimsIcon)`
  background-image: url(${receiveClaimIcon});
`;
const Label = styled.div`
  color: ${theme.colors.heavyText};
  display: inline-block;
  font-size: 0.75rem;
  position: relative;
  top: -5px;
  text-transform: uppercase;
`;
const ShareClaims = styled.div`
  margin-bottom: 30px;
  ${medium("margin: 0;")}
`;
const ReceiveClaims = styled(ShareClaims)``;
const Claim = styled.li`
  display: flex;
  padding-left: 30px;
  & + & {
    margin-top: 5px;
  }
`;
Claim.Name = styled.div`
  margin-right: 5px;
`;
Claim.Type = styled.div`
  color: ${theme.colors.mutedText};
`;

export default HomeCard;
