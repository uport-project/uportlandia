import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { xsmall } from "../shared/grid";

const MINIMAL = "MINIMAL";
const COMPACT = "COMPACT";
const DETAILED = "DETAILED";

class Services extends React.Component {
  render() {
    const {
      data,
      expanded=false,
      heading,
      type=DETAILED
    } = this.props;
    return (<React.Fragment>
      {heading ? <Heading>{heading}</Heading> : null}
      {data.map(service => (<Service className="services__service" key={service.name} type={type}>
        <Header type={type} className="services__service__header">
          <Logo src={service.icon} type={type} />
          {type !== MINIMAL ? <HeaderSub>{service.entity}</HeaderSub> : null}
          <HeaderMain type={type}>{service.name}</HeaderMain>
          {/*compact || <ServiceLink to={service.url}>get started</ServiceLink>*/}
        </Header>
        {!expanded || <React.Fragment>
          <Divider />
          <Claims className="services__service__claims">
            {service.generatedClaims.map(claim => (<li key={claim.name}
              className="services__service__claims__claim"
            >
              {claim.name}
            </li>))}
          </Claims>
        </React.Fragment>}
      </Service>))}
    </React.Fragment>)
  }
}
Services.MINIMAL = MINIMAL;
Services.COMPACT = COMPACT;
Services.DETAILED = DETAILED;

const Heading = styled.h3`
  font-size: 0.6875rem;
  margin: 40px 0 10px;
  text-transform: uppercase;
`;
const Header = styled.div`
  display: grid;
  grid-gap: 0 10px;
  ${props => props.type !== MINIMAL
    ? `
      grid-template-columns: 60px 1fr 75px;
      grid-template-rows: 2fr 3fr;
    `
    : `grid-template-columns: 24px 1fr;`}

  ${props => props.type === COMPACT
    ? `grid-template-columns: 40px 1fr 75px;`
    : ``}
  ${xsmall(`
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;

    & > * {
      margin: 5px 0;
      width: 100%;
    }
  `)}
`;
const Divider = styled.hr`
  border: none;
  border-top: solid 1px ${theme.colors.border};
  height: 1px;
`;
const Claims = styled.ul`
  list-style-type: none;
  margin: 0 20px 10px;
  padding: 0;

  li {
    border-top: solid 1px ${theme.colors.border};
    padding: 8px 0;

    &:first-child {
      border: none;
    }
  }
`;
const HeaderMain = styled.h4`
  align-self: center;
  color: ${theme.colors.text} !important;
  font-size: 1.125rem;
  ${props => props.type === COMPACT
    ? `
      font-size: 0.75rem;
    `
    : ``}
  ${props => props.type === MINIMAL
    ? `
      font-size: 0.875rem;
    `
    : ``}
  font-weight: 600;
`;
const HeaderSub = styled.div`
  align-self: end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 600;
  grid-area: 1 / 2 / 2 / 4;
  text-transform: uppercase;
`;
const Logo = styled.img`
  ${props => props.type === DETAILED
    ? `
      border-radius: 15px;
      grid-area: 1 / 1 / 3 / 2;
      max-height: 60px;
      max-width: 60px;
    `
    : ``}
  ${props => props.type === COMPACT
    ? `
      border-radius: 10px;
      max-height: 40px;
      max-width: 40px;
    `
    : ``}
  ${props => props.type === MINIMAL
    ? `
      border-radius: 3px;
      max-height: 24px;
      max-width: 24px;
    `
    : ``}
`;
const Service = styled.div`
  background: ${theme.main.bg};
  ${props => props.type === DETAILED
    ? `
      & + & {
        margin-top: 10px;
      }
    `
    : `
      & + & {
        margin-top: 5px;
      }
    `}

  ${props => props.type === COMPACT
    ? `
      padding: 10px 0;
    `
    : ``}
  ${props => props.type === DETAILED
    ? `
      border-radius: 5px;
      box-shadow: 0px 0px 8px rgba(63, 61, 75, 0.1);
      border: solid 1px ${theme.colors.border2};
      padding: 10px 20px;
    `
    : ``}
`;
export default Services;
