import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";

class Services extends React.Component {
  render() {
    const { data, heading } = this.props;
    return (<React.Fragment>
      <Heading>{heading}</Heading>
      {data.map(service => (<Service key={service.heading}>
        <Service.Header>
          <Service.Logo src={service.logo} />
          <Service.Header.Sub>{service.subHeading}</Service.Header.Sub>
          <Service.Header.Main>{service.heading}</Service.Header.Main>
          <Service.Link to={service.url}>details</Service.Link>
        </Service.Header>
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
const Service = styled.div`
  background: ${theme.main.bg};
  border: solid 1px ${theme.colors.border2};
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(63, 61, 75, 0.1);
  padding: 10px 20px;
`;
Service.Header = styled.div`
  display: grid;
  grid-gap: 0 10px;
  grid-template-columns: 60px 1fr 40px;
  grid-template-rows: 2fr 3fr;
`;
Service.Header.Main = styled.h4`
  align-self: center;
  color: ${theme.colors.text} !important;
  font-size: 1.125rem;
  font-weight: 600;
`;
Service.Header.Sub = styled.div`
  align-self: end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 600;
  grid-area: 1 / 2 / 2 / 4;
  text-transform: uppercase;
`;
Service.Logo = styled.img`
  grid-area: 1 / 1 / 3 / 2;
  max-height: 60px;
  max-width: 60px;
`;
Service.Link = styled(Link)`
  align-self: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: right;
  text-decoration: none;
`;

export default Services;
