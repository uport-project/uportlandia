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
import AcceptAttestationImg from "../../images/accept-attestation.svg";
import CityLogo from "../../images/city-id-icon.svg";

class SendAttestation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qrData: null,
      waiting: false,
      showQR: false
    };
  }
  componentDidMount() {
    this.props.initCredentials();
    this.props.loadProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    const { qrData } = this.state;
    const { show, data={} } = this.props;
    const { url, isPush } = data;
    if(show && !prevProps.show) {
      this.sendVerification();
    } else if(url && url !== prevProps.data.url) {
      const pngBuffer = qrImage.imageSync(data.url, { type: 'png' });
      const qrData = 'data:image/png;charset=utf-8;base64, ' + pngBuffer.toString('base64');
      this.setState({ qrData });
    }
  }
  handleClose = () => {
    this.setState({ qrData: null, showQR: false, waiting: false });
    this.props.onClose();
  }
  showQR = () => {
    this.setState({ showQR: true });
  }
  sendVerification = () => {
    const { claim } = this.props;
    const requestId = shortId.generate();
    this.setState({ qrData: null, requestId });
    this.props.sendVerification(requestId, this.props.profile, claim);
  }
  render() {
    const { showQR, qrData, waiting } = this.state;
    const { claim, profile, login={}, show } = this.props;
    const { url } = login;
    const issuedAt = (new Date()).toDateString();
    return (<Modal show={show}>
      <Backdrop />
      <Content>
        <Content.Grid>
          <Wrapper>
            <Content.Header>
              <ButtonClose onClick={this.handleClose}>&times;</ButtonClose>
              <h3>Check your device</h3>
              <p>Tap “Accept” in your uPort app to receive your claims</p>
            </Content.Header>
            <Content.Body>
              {showQR
                ? qrData
                  ? <React.Fragment>
                    <div>
                        <p>Scan this QR Code using the uPort App</p>
                      <QRWrapper>
                        <a href={url} target='_blank'>
                          <img className='qr' src={qrData} />
                        </a>
                      </QRWrapper>
                      <p>Or tap to open in a mobile browser</p>
                    </div>
                    <Refresh onClick={this.sendVerification}>
                      <img src={reloadImg} />
                      Refresh
                    </Refresh>
                  </React.Fragment>
                  : <LoadingIcon src={loadingImg} />
                : <img className="image" src={AcceptAttestationImg} />}
            </Content.Body>
            <Content.Footer>
              <a href="javascript:;" onClick={this.showQR}>Not receiving the request?</a>
            </Content.Footer>
          </Wrapper>
          <Info>
            <h3>You’re Interacting with...</h3>
            <Card>
              <Entity>
                <Entity.Header>
                  <Entity.Logo src={CityLogo} />
                  <Entity.Header.Sub>The City of Cleverland</Entity.Header.Sub>
                  <Entity.Header.Main>City ID</Entity.Header.Main>
                </Entity.Header>
                <hr />
                <Entity.Details>
                  <Entity.Details.Row>
                    <Entity.Details.Heading>Issuer</Entity.Details.Heading>
                    <Entity.Details.Name wide>The City of Cleverland</Entity.Details.Name>
                  </Entity.Details.Row>
                  <Entity.Details.Row>
                    <Entity.Details.Heading>Subject</Entity.Details.Heading>
                    <Entity.Details.Name>{profile.name}</Entity.Details.Name>
                    <Entity.Details.Value>{profile.address}</Entity.Details.Value>
                  </Entity.Details.Row>
                  <Entity.Details.Row>
                    <Entity.Details.Heading>Issued Date</Entity.Details.Heading>
                    <Entity.Details.Name wide>{issuedAt}</Entity.Details.Name>
                  </Entity.Details.Row>
                </Entity.Details>
              </Entity>
            </Card>

            <h3 className="marginTop">Claims you'll receive</h3>
            <Card>
              <Claims>
                <Claim>
                  <Claim.Name>First Name</Claim.Name>
                  <Claim.Value>{claim.firstName}</Claim.Value>
                </Claim>
                <Claim>
                  <Claim.Name>Last Name</Claim.Name>
                  <Claim.Value>{claim.lastName}</Claim.Value>
                </Claim>
                <Claim>
                  <Claim.Name>Address</Claim.Name>
                  <Claim.Value>{claim.address}</Claim.Value>
                </Claim>
                <Claim>
                  <Claim.Name>Date of Birth</Claim.Name>
                  <Claim.Value>{claim.dob}</Claim.Value>
                </Claim>
              </Claims>
            </Card>
            <p>This information will be stored in your app</p>
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
Content.Body = styled.div`
  .image {
    margin: 10px 0;
    max-height: 40vh;
    max-width: 90vw;
    ${medium(`
      max-width: 38vw;
      max-height: 50vh;
    `)}
  }
`;
Content.Footer = styled.div`
  align-items: start;
  a {
    color: ${theme.colors.primaryButtonText};
  }
`;
const Wrapper = styled.div`
  align-items: center;
  background: ${theme.gradient6};
  color: #fff;
  display: grid;
  grid-template-rows: 150px 1fr 150px;
  height: 90vh;
  justify-items: center;
`;
const Refresh = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  color: ${theme.colors.primaryButtonText};
  cursor: pointer;
  display: block;
  font-size: 0.9em;
  margin: 0 auto;
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
const Info = styled.aside`
  background: ${theme.colors.cardAltBg};
  display: none;
  height: 90vh;
  overflow-y: auto;
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
  hr {
    border: none;
    border-top: solid 1px ${theme.colors.border};
    left: -5%;
    margin: 10px 0;
    position: relative;
    width: 110%;
  }
`;
Entity.Header = styled.div`
  display: grid;
  grid-gap: 0 10px;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 2fr 3fr;
`;
Entity.Header.Main = styled.h4`
  align-self: center;
  font-size: 1.125rem;
  font-weight: 600;
`;
Entity.Header.Sub = styled.div`
  align-self: end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 600;
  grid-area: 1 / 2 / 2 / 3;
  text-transform: uppercase;
`;
Entity.Logo = styled.img`
  grid-area: 1 / 1 / 3 / 2;
`;
Entity.Details = styled.div``;
Entity.Details.Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 15px 0;
  & + & {
    border-top: solid 1px ${theme.colors.border};
  }
`;
Entity.Details.Heading = styled.div`
  font-size: 0.6875rem;
  grid-area: 1 / 1 / 2 / 3;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
Entity.Details.Name = styled.div`
  ${props => props.wide ? "grid-column: span 2;" : ""}
`;
Entity.Details.Value = styled.div`
  color: ${theme.colors.mutedText2};
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Claims = styled.div``;
const Claim = styled.div`
  display: flex;
  padding: 10px 0;
  & + & {
    border-top: solid 1px ${theme.colors.border};
  }
`;
Claim.Name = styled.div`
  flex: 1;
`;
Claim.Value = styled.div`
  color: ${theme.colors.mutedText2};
  flex: 1;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default SendAttestation;
