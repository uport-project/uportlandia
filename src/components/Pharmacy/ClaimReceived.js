import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton } from "../shared/elements";
import Services from "../shared/Services";
import SuccessIcon from "../../images/congratulations-pharmacy.svg";
import LikeDemo from "../shared/LikeDemo";
import PharmacyLogo from "../../images/pharmacy-logo.png";
import SERVICES from "../../constants/services";

class ClaimReceived extends React.Component {
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToPrescriptionHome();
    }
  }
  render() {
    const { data, redirectToHome } = this.props;
    if(!this.props.isLoggedIn)
      return null;
    const CTA = () => (<Card.CTA>
      <ThemedButton themeId={SERVICES.PHARMACY.id}
        className="long" secondary onClick={redirectToHome}
      >
        Back to Home
      </ThemedButton>
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <Col span={3}>
        </Col>
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Congratulations!</h2>
            <p>You received your Prescription claims.
              Your claims are stored in your uPort app.</p>
            <SuccessImage src={SuccessIcon} />
          </Card>
        </Col>
        <Col span={3}>
          <LikeDemo />
        </Col>
      </Grid>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  .card__content {
    padding-bottom: 30px;
  }
`;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
  max-width: 100%;
`;

export default ClaimReceived;
