import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import loadingImg from "../../images/loading.svg";
import spin from "../../utils/spinanim";

const LoadingOverlay = ({ loading, message }) => {
  const { t } = useTranslation();
  return (<OverlayBG show={loading}>
    {loading
      ? <Box>
        <LoadingIcon src={loadingImg} />
        <Message>{message || t("Loading") + "..."}</Message>
      </Box>
      : null}
  </OverlayBG>);
};
LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string
};

const OverlayBG = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  opacity: 0.01;
  transition: opacity 0.5s ease-in;
  ${props => props.show
    ? "top: 0;opacity: 1;"
    : ""}
`;
const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin-top: -24px;
  padding: 16px;
`;
const LoadingIcon = styled.img`
  ${spin}
  height: 64px;
  width: 64px;
`;
const Message = styled.div`
  margin-top: 10px;
  color: #e3e3e3;
`;

export default LoadingOverlay;
