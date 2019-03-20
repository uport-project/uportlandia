import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import shortId from "shortid";
import qrImage from "qr-image";

import * as theme from "../shared/theme";
import { medium } from "../shared/grid";
import Services from "../shared/Services";
import spin from "../../utils/spinanim";
import loadingImg from "../../images/loading.svg";
import reloadImg from "../../images/reload.svg";
import itunesImg from "../../images/itunes.svg";
import playStoreImg from "../../images/playstore.svg";

import {
  Modal,
  Backdrop,
  ButtonClose,
  Content,
  Wrapper,
  Refresh,
  QRWrapper,
  LoadingIcon,
  Status,
  Waiting,
  Info,
  Card,
  Entity,
  Claims,
  Claim
} from "./elements";

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
    const { requestedServices=[] } = this.props;
    const requestId = shortId.generate();
    this.props.requestDisclosure(
      requestId,
      requestedServices.map(rs => rs.claim)
    );
    this.setState({ requestId });
  }
  render() {
    const {
      heading,
      description,
      infoHeading,
      issuer,
      requestedServices,
      infoDetails,
      login={},
      show
    } = this.props;
    const { qrData, waiting } = this.state;
    const { profile, url } = login;
    const styles = {
      entityName: {
        color: issuer.colors.primary
      }
    };
    return (<Modal show={show}>
      <Backdrop />
      <Content>
        <Content.Grid>
          <Wrapper>
            <Content.Header>
              <ButtonClose onClick={this.handleClose}>&times;</ButtonClose>
              <h3>{heading}</h3>
              <p>{description}</p>
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
                <a href="https://itunes.apple.com/us/app/uport-id/id1123434510?mt=8" target="_blank">
                  <img src={itunesImg} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.uportMobile&hl=en" target="_blank">
                  <img src={playStoreImg} />
                </a>
              </AppStoreLinks>
            </Content.Footer>
          </Wrapper>
          <Info>
            <Info.Scrollable>
              <h3>{infoHeading}</h3>
              <Card>
                <Entity>
                  <Entity.Header>
                    <Entity.Logo src={issuer.logo} />
                    <Entity.Header.Sub style={styles.entityName}>{issuer.subHeading}</Entity.Header.Sub>
                    <Entity.Header.Main>{issuer.heading}</Entity.Header.Main>
                  </Entity.Header>
                  <hr />
                  <Entity.Details>
                    <Entity.Details.Row>
                      <Entity.Details.Heading>Issuer</Entity.Details.Heading>
                      <Entity.Details.Name wide>{issuer.name}</Entity.Details.Name>
                    </Entity.Details.Row>
                    {infoDetails && infoDetails.length
                      ? <React.Fragment>
                        {infoDetails.map(row => (<Entity.Details.Row key={row.heading}>
                          <Entity.Details.Heading>{row.heading}</Entity.Details.Heading>
                          <Entity.Details.Name wide={row.value === undefined}>
                            {row.name}
                          </Entity.Details.Name>
                          {row.value
                            ? <Entity.Details.Value>{row.value}</Entity.Details.Value>
                            : null}
                        </Entity.Details.Row>))}
                      </React.Fragment>
                      : null}
                  </Entity.Details>
                </Entity>
              </Card>
              {/*<p>You’ve never interacted with {issuer.name}</p>*/}
              <h3 className="marginTop">Requested information</h3>
              <ReqServices>
                {requestedServices && requestedServices.length
                  ? <React.Fragment>
                    <Services data={requestedServices} type={Services.MINIMAL} expanded />
                  </React.Fragment>
                  : <NoInfoReq>No information requested</NoInfoReq>}
              </ReqServices>
              <p>This information will be shared with {issuer.name}</p>
            </Info.Scrollable>
          </Info>
        </Content.Grid>
      </Content>
    </Modal>);
  }
}

const AppStoreLinks = styled.div`
  text-align: center;
  a {
    display: inline-block;
    margin: 0 5px;
  }
`;
const ReqServices = styled.div`
  .services__service {
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(63, 61, 75, 0.1);
    padding: 10px 15px;
  }
  .services__service + .services__service {
    margin-top: 20px;
  }
`;
const NoInfoReq = styled(Card)`
  color: ${theme.colors.mutedText2};
`;

export default UportLogin;
