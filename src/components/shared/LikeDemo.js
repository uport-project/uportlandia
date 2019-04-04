import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import DevIcon from "../../images/dev-icon.svg";
import CitizenIcon from "../../images/citizen-icon.svg";
import ArrowLeft from "../../images/arrow-left.svg";

class LikeTheDemo extends React.Component {
  render() {
    return (<Wrapper>
      <h3>Like the demo?</h3>
      <section>
        <Header>
          <Icon src={DevIcon} />
          <h4>Build user-centric trusted data apps with uPort</h4>
        </Header>
        <p>
          Issue, request and verify information about your users. Give your
          users the freedom to manage details about their digital-selves.
        </p>
        <ExtLink target="_blank" href="https://developer.uport.me">View Documentation</ExtLink>
      </section>
      <hr />
      <section>
        <Header>
          <Icon src={CitizenIcon} />
          <h4>Issue verified information to citizens in your city</h4>
        </Header>
        <p>
          Build trusted data ecosystem in your city. Let businesses and
          organizations thrive while maintaining privacy of the citizens.
        </p>
        <ExtLink target="_blank" href="https://uport.zendesk.com/hc/en-us">Contact Us</ExtLink>
      </section>
    </Wrapper>)
  }
}

const Wrapper = styled.aside`
  background-color: ${theme.main.bg};
  border-radius: 4px;
  box-shadow: 0 5px 6px rgba(63, 61, 75, 0.1);
  color: ${theme.footer.textColor};
  font-size: 0.875rem;
  margin-bottom: 30px;
  position: relative;

  h3 {
    background: ${theme.gradient7};
    border-radius: 4px 4px 0 0;
    color: #fff;
    font-weight: 600;
    margin: 0;
    padding: 15px 20px;
    text-transform: uppercase;
  }

  section {
    padding: 20px;
  }

  hr {
    border: none;
    border-top: solid 1px ${theme.colors.border};
    margin: 10px 20px;
  }
`;
const Header = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 15px;
  h4 {
    font-weight: 600;
    line-height: 1.25;
  }
`;
const Icon = styled.img`
  display: block;
  margin-right: 15px;
  width: 32px;
`;
const ExtLink = styled.a`
  align-items: center;
  display: flex;
  font-weight: 600;
  justify-content: flex-end;
  margin-top: 20px;
  text-decoration: none;
  &::after {
    background: transparent url(${ArrowLeft}) 0 4px no-repeat;
    content: "";
    display: inline-block;
    height: 1em;
    margin-bottom: -0.3em;
    width: 2em;
    transform: rotate(180deg);
  }
`;

export default LikeTheDemo;
