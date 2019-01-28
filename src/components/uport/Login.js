import React from "react";
import styled from "styled-components";
import shortId from "shortid";
import qrImage from "qr-image";

import loadingImg from "../../images/loading.svg";
import reloadImg from "../../images/reload.svg";
import spin from "../../utils/spinanim";

class UPortLogin extends React.Component {
  constructor(props) {
    super(props);
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
    const { login, messages, pollChasqui, verifyCredentials } = this.props;
    const { waiting } = this.state;
    // show QR
    if(!login.profile && login.url && login.url !== prevProps.login.url) {
      const pngBuffer = qrImage.imageSync(login.url, { type: "png" })
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
      this.setState({ qrData: null });
    }
  }
  handleLogin = () => {
    const requestId = shortId.generate();
    this.props.requestDisclosure(requestId);
    this.setState({ requestId })
  }
  render() {
    const { qrData, waiting } = this.state;
    const { login } = this.props;
    const { profile, requestUrl } = login;
    return (<Wrapper>
      {waiting && !profile || <Button onClick={this.handleLogin}>Login with uPort</Button>}
      {qrData
        ? <QRWrapper>
          <Refresh onClick={this.handleLogin}>
            <img src={reloadImg} />
            Refresh
          </Refresh>
          <img src={qrData} />
        </QRWrapper>
        : null}
      {!requestUrl || <a href={requestUrl} target="_blank">{requestUrl}</a>}
      {!waiting || <div>
        Waiting for login
        <LoadingIcon src={loadingImg} />
      </div>}

    </Wrapper>)
  }
}

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  height: 100vh;
  justify-items: center;
`;
const Button = styled.button`
  background: #5c50ca;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1em;
  font-weight: 600;
  padding: 20px 30px;
`;
const Refresh = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  padding: 10px 0;
  position: absolute;
  right: 0;
  top: -40px;
  & > img {
    height: 14px;
    margin-right: 5px;
  }
`;
const QRWrapper = styled.div`
  align-items: center;
  border: solid 1px #999;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  & > img {
    border-radius: 8px;
  }
`;
const LoadingIcon = styled.img`
  animation: ${spin};
  height: 18px;
  margin-left: 10px;
  width: 18px;
`;
export default UPortLogin;
