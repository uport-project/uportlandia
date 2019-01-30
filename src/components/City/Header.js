import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import CityIDIcon from "../../images/city-id-icon.svg";

class Header extends React.Component {
  render() {
    return (<Wrapper>
      <Container>
        <Logo src={CityIDIcon} alt="City Logo" />
        <h1>The City of Cleverland</h1>
      </Container>
    </Wrapper>)
  }
}

const Wrapper = styled.header`
  background-color: ${theme.header.bg};
  color: ${theme.header.textColor};
  padding: 10px 0;

  a {
    text-decoration: none;
  }

  ${Container} {
    align-items: center;
    display: flex;
  }
  h1 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-left: 10px;
  }
`;
const Logo = styled.img`

`;

export default Header;
