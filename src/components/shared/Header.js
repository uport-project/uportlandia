import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";

const Header = props => {
  const { logo, title } = props;
  const { t } = useTranslation();
  return (<Wrapper>
    <Container>
      <Center>
        <Logo src={logo} alt={title} />
        <h1>{t(title)}</h1>
      </Center>
      <Separator />
    </Container>
  </Wrapper>)
};

const Wrapper = styled.header`
  background-color: ${theme.header.bg};
  color: ${theme.header.textColor};
  padding: 10px 0;

  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-left: 20px;
  }

  ${Container} {
    position: relative;
  }
`;
const Center = styled.div`
  align-items: center;
  display: flex;
`;
const Logo = styled.img`
  border-radius: 15px;
  max-height: 60px;
`;
const Separator = styled.div`
  border-top: solid 1px ${theme.header.separatorColor};
  bottom: 0;
  height: 1px;
  left: 100px;
  position: absolute;
  right: 0;
`;

export default Header;
