import React from "react";
import styled from "styled-components";

import * as theme from "./theme";
import { medium } from "./grid";
import { Button, Form } from "./elements";

const ContentCard = props => {
  const { children, CTA } = props;
  const withCTA = Boolean(CTA);
  return (<Wrapper withCTA={withCTA}>
    <Spacer />
    <Content className="card__content" withCTA={withCTA}>
      {children}
    </Content>
    {CTA ? <CTA /> : null}
  </Wrapper>);
};

const Wrapper = styled.div`
  font-size: 0.875rem;
  line-height: 1.25;
  // margin: 0 auto;
  // max-width: 580px;
  padding: 0 0 30px;
  position: relative;
`;
const Content = styled.div`
  background-color: ${theme.main.bg};
  box-shadow: 0 5px 6px rgba(63, 61, 75, 0.1);
  color: ${theme.colors.text};
  margin: 0;
  overflow: auto;
  position: relative;
  padding: 20px;
  width: 100%;
  ${medium(`
    padding: 30px 40px;
    // max-width: 580px;
    // margin: 0 auto;
  `)}

  ${props => props.withCTA
    ? `
      border-radius: 5px 5px 0 0;
      // height: calc(100vh - 280px);
    `
    : `
      border-radius: 5px;
      // height: calc(100vh - 220px);
    `}

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
ContentCard.CTA = styled.div`
  // padding-bottom: 30px;
  ${Button}.long {
    border-radius: 0 0 5px 5px;
    font-size: 1rem;
    padding: 15px;
    text-transform: none;
    width: 100%;
  }
`;
const Spacer = styled.div`
  background-color: ${theme.main.bg};
  height: 20px;
  left: 20px;
  position: absolute;
  right: 20px;
  top: 0;
  z-index: 9;
`;

export default ContentCard;
