import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import * as theme from "../shared/theme";
import { Col, medium } from "../shared/grid";
import angleIcon from "../../images/angle-icon.svg";

const SidebarLeft = props => {
  const { service, active } = props;
  const { t } = useTranslation();
  const styles = {
    heading: {
      color: theme.colors[service.id].mutedText
    }
  };
  return (<Wrapper span={3}>
    <h3 style={styles.heading}>{t("get your")} {" "} {t(service.displayName)}</h3>
    <ol>
      {service.steps.map((step, idx) => <li key={step}>
        {t(step)}
        {idx===active
          ? <Arrow src={angleIcon} />
          : null}
      </li>)}
    </ol>
  </Wrapper>)
};

const Wrapper = styled(Col)`
  display: none;
  font-weight: 600;
  line-height: 1.2;
  ${medium("display: block;")}

  h3 {
    font-size: 1.5rem;
    margin: 35px 0 10px;
  }
  ol {
    color: ${theme.colors.mutedText3};
    font-size: 1.125rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      margin-right: 30px;
      padding: 20px 0;
      position: relative;
    }
    li + li {
      border-top: solid 1px ${theme.colors.border3};
    }
  }
`;
const Arrow = styled.img`
  position: absolute;
  right: -15px;
  top: 22px;
`;

export default SidebarLeft;
