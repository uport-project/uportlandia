import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import shortId from "shortid";
import qrImage from "qr-image";

import * as theme from "../shared/theme";
import { medium } from "../shared/grid";
import spin from "../../utils/spinanim";
import loadingImg from "../../images/loading.svg";
import reloadImg from "../../images/reload.svg";
import itunesImg from "../../images/itunes.svg";
import playStoreImg from "../../images/playstore.png";
import CityLogo from "../../images/city-id-icon.svg";

class UportLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrData: null,
      waiting: false
    };
  }
  componentDidMount() {
    this.props.initCredentials();
    this.props.loadProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    const { login, messages, pollChasqui, show, verifyCredentials } = this.props;
    const { waiting } = this.state;
    if(show && !prevProps.show) {
      this.handleLogin();
    } else if(!login.profile && login.url && login.url !== prevProps.login.url) {
      // show QR
      const pngBuffer = qrImage.imageSync(login.url, { type: "png" });
      const qrData = "data:image/png;charset=utf-8;base64, " + pngBuffer.toString("base64");
      pollChasqui(login.callbackId);
      this.setState({ qrData });
    } else if(!login.profile && login.url) {
      // check for Chasqui Response
      let message = messages.find(msg => msg.id === login.callbackId);
      if(message && message.loading && !waiting) {
        this.setState({ waiting: true });
      } else if(message && !message.loading && waiting) {
        // verify token
        this.setState({ waiting: false });
        verifyCredentials(message.content);
      }
    } else if(!prevProps.login.profile && login.profile) {
      // logged in!
      this.setState({ qrData: null });
      this.props.onLoginSuccess(login.profile);
    }
  }
  handleClose = () => {
    this.setState({ qrData: null });
    this.props.onClose();
  }
  handleLogin = () => {
    const requestId = shortId.generate();
    this.props.requestDisclosure(requestId);
    this.setState({ requestId });
  }
  render() {
    const { qrData, waiting } = this.state;
    const { login={}, show } = this.props;
    const { profile, url } = login;
    return (<Modal show={show}>
      <Backdrop />
      <Content>
        <Content.Grid>
          <Wrapper>
            <Content.Header>
              <ButtonClose onClick={this.handleClose}>&times;</ButtonClose>
              <h3>First things first...</h3>
              <p>To login scan the QR code with  the uPort app.</p>
            </Content.Header>
            <Content.Body>
            {qrData
              ? <React.Fragment>
                <div>
                  <QRWrapper>
                    <a href={url} target="_blank">
                      <img className="qr" src={qrData} />
                    </a>
                  </QRWrapper>
                  <p>Or tap to open in a mobile browser</p>
                </div>
              </React.Fragment>
              : <LoadingIcon src={loadingImg} />}
            </Content.Body>
            <Content.Footer>
              <Status>
                {!waiting || <Waiting>
                  Waiting for login
                  <LoadingIcon src={loadingImg} />
                </Waiting>}
                {!qrData || <Refresh onClick={this.handleLogin}>
                  <img src={reloadImg} />
                  Refresh
                </Refresh>}
              </Status>
              <AppStoreLinks>
                <p>Don’t have the app? Download it from your store</p>
                <a href="#" target="_blank">
                  <img src={itunesImg} />
                </a>
                <a href="#" target="_blank">
                  <img src={playStoreImg} />
                </a>
              </AppStoreLinks>
            </Content.Footer>
          </Wrapper>
          <Info>
            <h3>You're logging in to</h3>
            <Card>
              <Entity>
                <Logo src={CityLogo} />
                <Sup>The City of Cleverland</Sup>
                <h4>City ID</h4>
                <hr />
                <h5>Issuer</h5>
                <Issuer>The City of Cleverland</Issuer>
              </Entity>
            </Card>
            <p>You’ve never interacted with The City of Cleverland</p>

            <h3 className="marginTop">Requested Claims</h3>
            <Card>
              <RequestedClaims>
                No claims requested
              </RequestedClaims>
            </Card>
            <p>This information will be shared with The City of Cleverland</p>
          </Info>
        </Content.Grid>
      </Content>
    </Modal>);
  }
}

const Modal = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 0.5s, visibility 0.5s;
  z-index: 900;
  ${props => props.show
    ? `
      opacity: 1;
      visibility: visible;
    `
    : `
      opacity: 0;
      visibility: hidden;
    `}
`;
const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 910;
`;
const ButtonClose = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 2em;
  font-weight: 700;
  position: absolute;
  right: 10px;
  top: 10px;
`;
const Content = styled.div`
  font-size: 0.875rem;
  left: 50%;
  position: relative;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 920;
  width: 85vw;

  p {
    margin: 10px 0;
    text-align: center;
  }
`;
Content.Header = styled.div`
  align-self: center;
  text-align: center;
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
Content.Grid = styled.div`
  ${medium(`
    display: grid;
    grid-template-columns: 3fr 2fr;
  `)}
`;
Content.Body = styled.div``;
Content.Footer = styled.div`
  align-items: start;
`;
const AppStoreLinks = styled.div`
  text-align: center;
  a {
    display: inline-block;
    margin: 0 5px;
  }
`;
const Wrapper = styled.div`
  align-items: center;
  background: ${theme.gradient6};
  color: #fff;
  display: grid;
  grid-template-rows: 150px 1fr 150px;
  min-height: 80vh;
  justify-items: center;
`;
const Refresh = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  color: ${theme.colors.primaryButtonText};
  cursor: pointer;
  font-size: 0.9em;
  padding: 10px 0;
  & > img {
    height: 14px;
    margin-right: 5px;
  }
`;
const QRWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  .qr {
    margin: 10px 0;
    max-height: 40vh;
    max-width: 90vw;
    ${medium(`
      max-width: 38vw;
      max-height: 50vh;
    `)}
  }
`;
const LoadingIcon = styled.img`
  ${spin}
  height: 18px;
  margin-left: 10px;
  width: 18px;
`;
const Status = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const Waiting = styled.div`
  color: ${theme.colors.mutedText};
  margin-right: 30px;
  padding: 10px 0;
`;
const Info = styled.aside`
  background: ${theme.colors.cardAltBg};
  display: none;
  padding: 80px 30px 30px;
  h3 {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 10px;
    text-transform: uppercase;

    &.marginTop {
      margin-top: 30px;
    }
  }
  p {
    color: ${theme.colors.mutedText2};
    margin: 10px 0;
    text-align: left;
  }
  ${medium("display: block;")}
`;
const Card = styled.div`
  background: ${theme.main.bg};
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(63, 61, 75, 0.1);
  padding: 20px;
`;
const Entity = styled.div`
  display: grid;
  grid-gap: 0 10px;
  grid-template-rows: 2fr 2fr auto auto 1fr;
  grid-template-columns: 60px 1fr 1fr 1fr;

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    grid-area: 2 / 2 / 3 / 5;
  }
  hr {
    border: none;
    border-top: solid 1px ${theme.colors.border};
    grid-area: 3 / 1 / 4 / 5;
    left: -5%;
    margin: 10px 0 15px;
    position: relative;
    width: 110%;
  }
  h5 {
    font-size: 0.6875rem;
    grid-area: 4 / 1 / 5 / 5;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
`;
const Logo = styled.img`
  grid-area: 1 / 1 / 3 / 2;
`;
const Sup = styled.div`
  align-self: center;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 600;
  grid-area: 1 / 2 / 2 / 5;
  text-transform: uppercase;
`;
const Issuer = styled.div`
  font-size: 0.875rem;
  grid-area: 5 / 1 / 6 / 3;
`;
const RequestedClaims = styled.div`
  color: ${theme.colors.mutedText2};
`;

export default UportLogin;
