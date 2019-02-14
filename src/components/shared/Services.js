import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";

class Services extends React.Component {
  render() {
    const { data, heading, compact=false } = this.props;
    return (<React.Fragment>
      {heading ? <Heading>{heading}</Heading> : null}
      {data.map(service => (<Service key={service.name} compact={compact}>
        <Header>
          <Logo src={service.icon} />
          <HeaderSub>{service.entity}</HeaderSub>
          <HeaderMain>{service.name}</HeaderMain>
          {compact || <ServiceLink to={service.url}>get started</ServiceLink>}
        </Header>
      </Service>))}
    </React.Fragment>)
  }
}

const ErrorImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;
const Heading = styled.h3`
  font-size: 0.6875rem;
  margin: 40px 0 10px;
  text-transform: uppercase;
`;
const Header = styled.div`
  display: grid;
  grid-gap: 0 10px;
  grid-template-columns: 60px 1fr 75px;
  grid-template-rows: 2fr 3fr;
`;
const HeaderMain = styled.h4`
  align-self: center;
  color: ${theme.colors.text} !important;
  font-size: 1.125rem;
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
  border-radius: 15px;
  grid-area: 1 / 1 / 3 / 2;
  max-height: 60px;
  max-width: 60px;
`;
const ServiceLink = styled(Link)`
  align-self: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: right;
  text-decoration: none;
`;
const Service = styled.div`
  background: ${theme.main.bg};
  & + & {
    margin-top: 10px;
  }

  ${props => props.compact
    ? `
      padding: 10px 0;
      ${Header} {
        grid-template-columns: 40px 1fr 75px;
      }
      ${HeaderMain} {
        font-size: 0.75rem;
      }
      ${Logo} {
        border-radius: 10px;
        max-height: 40px;
        max-width: 40px;
      }
    `
    : `
      border-radius: 5px;
      box-shadow: 0px 0px 8px rgba(63, 61, 75, 0.1);
      border: solid 1px ${theme.colors.border2};
      padding: 10px 20px;
    `}
`;
export default Services;
