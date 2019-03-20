import React from "react";
import styled from "styled-components";

import * as theme from "./theme";
import Services from "../shared/Services";

const ServiceRequirements = props => {
  const { service } = props;
  return (<Wrapper>
    <Heading>{service.entity} will ask you to share</Heading>
    {service.requiredServices
      ? <Services data={service.requiredServices} type={Services.MINIMAL} />
      : <ClaimList>
        {service.requiredClaims.map(c => (<li key={c.name}>
          {c.name}
        </li>))}
      </ClaimList>}
  </Wrapper>);
};

const ClaimList = styled.ol`
  list-style-type: none;
  li {
    margin: 5px 0;
  }
`;
const Wrapper = styled.div`
  font-size: 0.875rem;
  line-height: 1.25;
  margin-top: 40px;

  .services__service, ${ClaimList} {
    background: ${theme.colors.cardAltBg};
    border-radius: 5px;
    margin: 10px 0;
    padding: 20px 32px;
  }
`;
const Heading = styled.h3`
  color: ${theme.colors.text3};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export default ServiceRequirements;
