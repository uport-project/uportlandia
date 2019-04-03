import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton } from "../shared/elements";
import SidebarLeft from "../shared/SidebarLeft";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face-city.svg";
import AttestationModal from "../uport/AttestationContainer";
import CityLogo from "../../images/city-logo.png";
import SERVICES from "../../constants/services";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToCityHome();
    } else if(!isValid(this.props.data).valid) {
      this.props.redirectToCityIdForm();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
    this.props.redirectToCityIdReceived();
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { data } = this.props;
    if(!this.props.isLoggedIn || !isValid(this.props.data).valid)
      return null;
    const CTA = () => (<Card.CTA>
      <ThemedButton themeId={SERVICES.CITY_ID.id}
        className="long" secondary onClick={this.showAttestationModal}
      >
        Receive City ID
      </ThemedButton>
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.CITY_ID} active={3} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Good News!</h2>
            <p>Your information has been succesfully verified. Your City ID is
              ready to be issued.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>What’s next?</h4>
            <p>
              Let’s make sure you have an access to your uPortlandia City ID
              whenever and wherever you need them. {SERVICES.CITY_ID.entity} is
              going to send your new ID claims to your uPort app.
            </p>
          </Card>
        </Col>
        <Col span={3}>
        </Col>
      </Grid>
      <AttestationModal
        heading="Check your device"
        description="Tap 'Accept' in your uPort app to receive your claims"
        infoHeading="You're Interacting with..."
        issuer={{
          heading: SERVICES.CITY_ID.name,
          subHeading: SERVICES.CITY_ID.entity,
          name: SERVICES.CITY_ID.entity,
          logo: SERVICES.CITY_ID.icon,
          colors: theme.colors[SERVICES.CITY_ID.id]
        }}
        infoDetails={[{
          heading: "Issued Date",
          name: (new Date()).toDateString()
        }]}
        claimDetails={SERVICES.CITY_ID.generatedClaims.map(c => ({
          name: c.name,
          value: data[c.id]
        }))}
        show={data && attestationModal}
        onClose={this.hideAttestationModal}
        claim={{
          [SERVICES.CITY_ID.claim]: data
        }} />
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
