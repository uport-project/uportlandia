import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";

class Header extends React.Component {
  render() {
    return (<Container>
      <ContentWrapper>
        {this.props.children}
      </ContentWrapper>
    </Container>)
  }
}

const Container = styled.header`
  background-color: ${theme.header.bg};
  padding: 20px;
  position: relative;

  a {
    text-decoration: none;
  }
`;

const ContentWrapper = styled.div`
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  // left: 50%;
  // position: relative;
  // transform: translateX(-50%);
`;

export default Header;
