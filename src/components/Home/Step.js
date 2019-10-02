import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { SERVICES } from "../../constants/config";

function Step (props) {
  const { t } = useTranslation();
  const { sid } = props;
  let heading, content;
  switch(sid) {
    case SERVICES.DRIVERS_LICENSE.id:
      heading = t("Step 1");
      content = (<p>
        <strong>{t("Prove your identity")}.</strong>
        {" "}
        <span>{t("To kick off the process get a proof of your driver's license")}</span>
      </p>);
      break;

    case SERVICES.SAFE_DRIVER.id:
      heading = t("Step 2");
      content = (<p>
        <strong>{t("Buy a new car")}.</strong>
        {" "}
        <span>{t("You can get it right away or get a loan for it")}</span>
      </p>);
      break;

    case SERVICES.INSURANCE.id:
      heading = t("Step 3");
      content = (<p>
        <strong>{t("Become a driver")}.</strong>
        {" "}
        <span>{t("To drive other passengers you need car insurance")}</span>
      </p>);
      break;

    case SERVICES.INVESTMENTS.id:
      heading = t("Step 4");
      content = (<p>
        <strong>{t("Become a shareholder")}.</strong>
        {" "}
        <span>{t("Even though you're your own boss")}</span>
      </p>);
      break;

    default:
      return null;
  }
  return (<Wrapper>
    <h4>{heading}</h4>
    {content}
  </Wrapper>);
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 4rem 0 0;
  transform: translateY(20px);
  h4 {
    color: ${theme.homeCards.stepHeadingColor};
    font-size: ${12/16}rem;
    font-weight: 600;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  p {
    color: ${theme.homeCards.stepTextColor};
    font-size: ${14/16}rem;
    line-height: 1.5;
  }
  strong {
    font-weight: 600;
  }
`;

export default Step;
