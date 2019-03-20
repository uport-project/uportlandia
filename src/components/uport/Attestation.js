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
import playStoreImg from "../../images/playstore.svg";
import AcceptAttestationImg from "../../images/accept-attestation.svg";

import {
  Modal,
  Backdrop,
  ButtonClose,
  Content,
  DoneButton,
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

class Attestation extends React.Component {
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
    // this.props.loadProfile();
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
    const {
      heading,
      description,
      infoHeading,
      issuer,
      infoDetails,
      claimDetails,
      claim,
      profile,
      login={},
      show
    } = this.props;
    const { url } = login;
    const issuedAt = (new Date()).toDateString();
    if(!profile)
      return null;
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
                    <CenteredRefresh onClick={this.sendVerification}>
                      <img src={reloadImg} />
                      Refresh
                    </CenteredRefresh>
                  </React.Fragment>
                  : <LoadingIcon src={loadingImg} />
                : <Image src={AcceptAttestationImg} />}
            </Content.Body>
            <Content.Footer>
              <DoneButton onClick={this.handleClose}>Done</DoneButton>
              <a className="text-link"
                href="javascript:;"
                onClick={this.showQR}>Not receiving the request?</a>
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
                    <Entity.Details.Row>
                      <Entity.Details.Heading>Subject</Entity.Details.Heading>
                      <Entity.Details.Name>{profile.name}</Entity.Details.Name>
                      <Entity.Details.Value>{profile.address}</Entity.Details.Value>
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

              <h3 className="marginTop">Verified information you'll receive</h3>
              <Card>
                <Claims>
                  {claimDetails && claimDetails.length
                  ? <React.Fragment>
                    {claimDetails.map(claim => (<Claim key={claim.name}>
                      <Claim.Name>{claim.name}</Claim.Name>
                      <Claim.Value>{claim.value}</Claim.Value>
                    </Claim>))}
                  </React.Fragment>
                  : <p>No verified information to receive</p>}
                </Claims>
              </Card>
              <p>This information will be stored in your app</p>
            </Info.Scrollable>
          </Info>
        </Content.Grid>
      </Content>
    </Modal>);
  }
}

const Image = styled.img`
  margin: 10px 0;
  height: calc(80vh - 300px);
  max-height: 40vh;
  max-width: 90vw;
  ${medium(`
    max-width: 38vw;
    max-height: 50vh;
  `)}
`;
const CenteredRefresh = styled(Refresh)`
  display: block;
  margin: 0 auto;
`;

export default Attestation;
