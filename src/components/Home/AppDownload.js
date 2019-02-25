import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { medium } from "../shared/grid";
import HandyPhone from "../../images/handy-phone.svg";
import iTunes from "../../images/itunes.svg";
import PlayStore from "../../images/playstore.svg";

const AppDownload = ({ show, onClose }) => {
  if(!show)
    return null;
  return (<Wrapper>
    <Container>
      <Close mobile onClick={onClose}>&times;</Close>
      <Phone src={HandyPhone} />
      <Message>Psst... Make sure you have your phone handy with the uPort app downloaded.</Message>
      <Message mobile>Psst... Make sure you have the uPort app downloaded.</Message>
      <Row>
        <AppStoreLink href="https://itunes.apple.com/us/app/uport-id/id1123434510?mt=8" target="_blank">
          <img src={iTunes} />
        </AppStoreLink>
        <AppStoreLink href="https://play.google.com/store/apps/details?id=com.uportMobile&hl=en" target="_blank">
          <img src={PlayStore} />
        </AppStoreLink>
      </Row>
      <Close onClick={onClose}>&times;</Close>
    </Container>
  </Wrapper>);
};

const Wrapper = styled.div`
  background: ${theme.appDownloadSticky.bg};
  color: ${theme.appDownloadSticky.color};
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 9;
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 600;
  justify-content: center;
  margin: 0 auto;
  max-width: 840px;
  padding: 20px;
  ${medium(`
    flex-direction: row;
  `)}
`;
const Phone = styled.img`
  display: none;
  margin-right: 40px;
  ${medium(`
    display: block;
  `)}
`;
const Message = styled.p`

  line-height: 1.25;
  margin-right: 30px;
  text-align: center;
  ${props => props.mobile
    ? ""
    : "display: none;"}
  ${props => props.mobile
    ? medium("display: none;")
    : medium("display: block;")}
`;
const Row = styled.div`
  display: flex;
  margin: 10px 20px 0 0;
  ${medium(`
    margin: 0 0 0 0;
  `)}
`;
const AppStoreLink = styled.a`
  & + & {
    margin-left: 10px
  }
`;
const Close = styled.button`
  background: none;
  border: none;
  color: ${theme.appDownloadSticky.color};
  cursor: pointer;
  display: none;
  font-size: 1.5rem;
  @media all and (min-width: 900px) {
    margin: 0;
    position: absolute;
    right: 20px;
  }
  ${props => props.mobile
    ? `
      display: block;
      position: absolute;
      right: 5px;
      top: 5px;
      ${medium("display: none;")}
    `
    : `
      ${medium(`
        display: block;
        margin-left: 20px;
      `)}
    `}
`;

export default AppDownload;
