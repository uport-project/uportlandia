import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import * as theme from "./theme";

class Tooltip extends React.Component {
  render() {
    const { id, children } = this.props;
    return (<StyledTooltip id={id}>
      {children}
    </StyledTooltip>);
  }
}
Tooltip.Heading = styled.h4`
  color: ${theme.colors.textSecondary};
  font-weight: 600;
  margin-bottom: 10px;
`;

const StyledTooltip = styled(ReactTooltip)`
  font-size: 0.875rem;
  color: #1e1e1e !important;
  background-color: #fff !important;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  padding: 20px;

  &.place-top:after {
    border-top-color: #fff !important;
  }
  &.place-bottom:after {
    border-bottom-color: #fff !important;
  }
  &.place-left:after {
    border-left-color: #fff !important;
  }
  &.place-right:after {
    border-right-color: #fff !important;
  }
  &.show {
    opacity: 1 !important;
  }
`;

export default Tooltip;
