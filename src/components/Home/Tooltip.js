import React from "react";
import Tooltip from "../shared/Tooltip";
import styled from "styled-components";

import { medium } from "../shared/grid";

const CardTooltip = props => {
  const { id, heading, description, children } = props;
  return (<Tooltip id={id}>
    <Container>
      <Tooltip.Heading>{heading}</Tooltip.Heading>
      <Description>{description}</Description>
      {children}
    </Container>
  </Tooltip>);
};

const Container = styled.div`
  width: 70vw;
  ${medium("width: 25em;")}
`;
const Description = styled.p`
  font-size: 0.875rem;
  margin-bottom: 15px;
`;

export default CardTooltip;
