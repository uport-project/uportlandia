import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";

class Footer extends React.Component {
  render() {
    return (<Container>
      Footer content ...
    </Container>)
  }
}

const Container = styled.footer`
  background-color: ${theme.footer.bg};
  padding: 20px;
  position: relative;
`;

export default Footer;
