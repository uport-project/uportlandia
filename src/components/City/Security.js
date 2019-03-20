import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { large } from "../shared/grid";
import SecureIcon from "../../images/secure-icon.svg";
import CitizenIcon from "../../images/citizen-icon.svg";
import ArrowLeft from "../../images/arrow-left.svg";

class Security extends React.Component {
  render() {
    return (<Wrapper>
      <section>
        <Header>
          <Icon src={SecureIcon} />
          <h4>Psst, even though it's just a demo...</h4>
        </Header>
        <p>
          Any data that you enter is securely protected and encrypted.
          It will be added as an attestation to your uPort Identity
          (you can always delete it at any time).
        </p>
        <p>
          We do not store any of this information and do not reveal it to
          any party.
        </p>
      </section>
    </Wrapper>)
  }
}

const Wrapper = styled.aside`
  height: 100%;

  section {
    background-color: ${theme.main.bg};
    border-radius: 4px;
    box-shadow: 0 5px 6px rgba(63, 61, 75, 0.1);
    color: ${theme.footer.textColor};
    display: none;
    font-size: 0.875rem;
    margin: 0 20px 20px 0;
    padding: 20px;

    ${large(`
      bottom: 50px;
      display: block;
      max-width: 250px;
      position: fixed;
    `)}
  }
  p + p {
    margin-top: 15px;
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

export default Security;
