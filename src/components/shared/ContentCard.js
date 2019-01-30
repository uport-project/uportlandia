import React from "react";
import styled from "styled-components";

import * as theme from "./theme";
import { Container } from "./grid";
import { Button, Form } from "./elements";

const ContentCard = ({ children }) => (<Wrapper>
  <Content>
    {children}
  </Content>
</Wrapper>);

const Wrapper = styled.div`
  padding: 30px 0;
  font-size: 0.875rem;
  line-height: 1.25;
`;
const Content = styled.div`
  background-color: ${theme.main.bg};
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(63, 61, 75, 0.1);
  color: ${theme.colors.text};
  margin: 0 auto;
  padding: 30px 40px 80px;
  position: relative;
  max-width: 580px;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 30px;
  }

  p {
    margin: 12px 0;

    & + & {
      margin-top: 0;
    }
  }

  ${Form} {
    margin-top: 30px;
  }

  ${Button} {
    border-radius: 0 0 5px 5px;
    bottom: 0;
    left: 0;
    font-size: 1rem;
    padding: 15px;
    position: absolute;
    right: 0;
    text-transform: none;
    width: 100%;
  }

  hr {
    border: none;
    border-top: 1px solid #F0F0F0;
    margin: 40px 0;
  }

  h4 {
    color: ${theme.colors.textSecondary};
    font-weight: 600;
  }
`;

export default ContentCard;
