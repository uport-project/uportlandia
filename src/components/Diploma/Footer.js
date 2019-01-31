import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container } from "../shared/grid";
import * as theme from "../shared/theme";

class Footer extends React.Component {
  render() {
    return (<Wrapper>
      <Container>

      </Container>
    </Wrapper>)
  }
}

const Wrapper = styled.footer`
  background-color: ${theme.footer.bg};
  color: ${theme.footer.textColor};
  padding: 20px 0;
`;

export default Footer;
