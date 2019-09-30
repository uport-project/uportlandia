/* eslint no-script-url: 0 */
/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint react/jsx-no-target-blank: 0 */
import React from "react";
import styled from "styled-components";
import shortId from "shortid";
import qrImage from "qr-image";
import { withTranslation } from "react-i18next";

import isMobile from "../../utils/isMobile";
import { largeHeight, medium } from "../shared/grid";
import loadingImg from "../../images/loading.svg";
import reloadImg from "../../images/reload.svg";
import AcceptAttestationImg from "../../images/accept-attestation.png";

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
    this.isMobile = isMobile();
    if(this.isMobile) {
      this.sendVerification();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { show, data={} } = this.props;
    const { url, isPush } = data;
    if(show && !prevProps.show) {
      this.sendVerification();
    } else if(url && url !== prevProps.data.url) {
      // show QR
      const pngBuffer = qrImage.imageSync(data.url, { type: 'png' });
      const qrData = 'data:image/png;charset=utf-8;base64, ' + pngBuffer.toString('base64');
      this.setState({ qrData });
      if(!isPush && this.isMobile && show) {
        window.location.href = data.url;
      }
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
    const { serviceId, claim } = this.props;
    const requestId = shortId.generate();
    this.setState({ qrData: null, requestId });
    this.props.sendVerification(
      serviceId,
      requestId,
      this.props.profile,
      claim,
      this.isMobile
    );
  }
  render() {
    const { showQR, qrData } = this.state;
    const {
      heading,
      infoHeading,
      issuer,
      infoDetails,
      claimDetails,
      login={},
      profile,
      show,
      t
    } = this.props;
    const { url } = login;
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
              {this.state.showQR
                ? <CustomHeading>{t("Scan this QR Code using the uPort App")}</CustomHeading>
                : <CustomHeading>{t(heading)}</CustomHeading>}
            </Content.Header>
            <Content.Body>
              {showQR
                ? qrData
                  ? <React.Fragment>
                    <div>
                      <QRWrapper>
                        <a href={url} target='_blank'>
                          {this.isMobile
                            ? <p>{t("Tap to open in a mobile browser")}</p>
                            : <img className='qr' src={qrData} alt="QR" />}
                        </a>
                      </QRWrapper>
                    </div>
                    <CenteredRefresh onClick={this.sendVerification}>
                      <img src={reloadImg} alt="Reload" />
                      {t("Refresh")}
                    </CenteredRefresh>
                  </React.Fragment>
                  : <LoadingIcon src={loadingImg} />
                : <Image src={AcceptAttestationImg} />}
            </Content.Body>
            <Content.Footer>
              <DoneButton withQR={this.state.showQR} onClick={this.handleClose}>
                {t("Done")}
              </DoneButton>
              {this.state.showQR || <a className="text-link"
                href="javascript:;"
                onClick={this.showQR}>{t("Not receiving the request?")}</a>}
            </Content.Footer>
          </Wrapper>
          <Info>
            <Info.Scrollable>
              <h3>{t(infoHeading.replace(/\./g, ""))}</h3>
              <Card>
                <Entity>
                  <Entity.Header>
                    <Entity.Logo src={issuer.logo} />
                    <Entity.Header.Sub style={styles.entityName}>{t(issuer.subHeading)}</Entity.Header.Sub>
                    <Entity.Header.Main>{t(issuer.heading)}</Entity.Header.Main>
                  </Entity.Header>
                  <hr />
                  <Entity.Details>
                    <Entity.Details.Row>
                      <Entity.Details.Heading>{t("Issuer")}</Entity.Details.Heading>
                      <Entity.Details.Name wide>{t(issuer.name)}</Entity.Details.Name>
                    </Entity.Details.Row>
                    <Entity.Details.Row>
                      <Entity.Details.Heading>{t("Subject")}</Entity.Details.Heading>
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

              <h3 className="marginTop">{t("Verified information you'll receive")}</h3>
              <Card>
                <Claims>
                  {claimDetails && claimDetails.length
                  ? <React.Fragment>
                    {claimDetails.map(claim => (<Claim key={claim.name}>
                      <Claim.Name>{t(claim.name)}</Claim.Name>
                      <Claim.Value>{claim.value}</Claim.Value>
                    </Claim>))}
                  </React.Fragment>
                  : <p>{t("No verified information to receive")}</p>}
                </Claims>
              </Card>
              <p>{t("This information will be stored in your app")}</p>
            </Info.Scrollable>
          </Info>
        </Content.Grid>
      </Content>
    </Modal>);
  }
}

const Image = styled.img`
  margin: 10px 0;
  // height: calc(80vh - 300px);
  max-height: 40vh;
  max-width: 90vw;
  min-height: 200px;
  ${medium(`
    max-width: 48vw;
    max-height: calc(100vh - 300px);
  `)}
`;
const CenteredRefresh = styled(Refresh)`
  display: none;
  margin: 0 auto;
  ${largeHeight(`
    display: block
  `)}
`;
const CustomHeading = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 10px;
  @media all and (max-height: 550px) {
    font-size: 1rem;
    padding: 20px 10px;
  }
  ${largeHeight(`
    display: block;
  `)}
`;

export default withTranslation()(Attestation);
