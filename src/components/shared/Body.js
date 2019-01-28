import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";

class Body extends React.Component {
  render() {
    const { className } = this.props;
    return (<Container className={className}>
      {this.props.children}
    </Container>)
  }
}

const Container = styled.main`
  background-color: ${theme.main.bg};
`;

export default Body;
