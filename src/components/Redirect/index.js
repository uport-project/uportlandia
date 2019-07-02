import React from "react";
import { default as styled, keyframes } from "styled-components";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { getExternalNavName } from "../../selectors";
import * as theme from "../shared/theme";
import { medium } from "../shared/grid";
import waveImg from "../../images/wave.svg";

const Redirect = ({ name }) => {
  const { t } = useTranslation();
  return (<Wrapper>
    <section>
      <h1>{t("See you later!")}</h1>
      <p>
        {t("You are leaving the uPortlandia dashboard")} {" "}
        <strong>{t(name)}</strong>{" "}
        {t("website to continue")}
      </p>
      <img src={waveImg} alt={t("Bye!")} />
    </section>
  </Wrapper>);
}

const waveAnim = keyframes`
  0% {
    transform:rotate(0deg);
  }
  50% {
    transform:rotate(5deg);
  }
  100% {
    transform:rotate(0deg);
  }
`;
const Wrapper = styled.div`
  background: #F0F0F0;
  height: 100vh;
  section {
    padding: 20vh 0 0 0;
    text-align: center;
    ${medium(`
      margin: 0 auto;
      text-align: left;
      width: 40vw;
    `)}
  }
  h1 {
    color: ${theme.colors.primary};
    font-weight: 600;
    margin-bottom: 15px;
  }
  strong {
    font-weight: 600;
  }
  img {
    animation: ${waveAnim} 1s linear infinite;
    display: block;
    margin: 30px auto 0;
    transform-origin: bottom right;
  }
`;

const mapStateToProps = state => ({
  name: getExternalNavName(state)
});

export default connect(mapStateToProps)(Redirect);
