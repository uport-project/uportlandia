import React from "react";
import styled from "styled-components";

import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton } from "../shared/elements";
import LikeDemo from "../shared/LikeDemo";
import SuccessIcon from "../../images/congratulations-transport.svg";
import SERVICES from "../../constants/services";

class ClaimReceived extends React.Component {
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToDiplomaHome();
    }
  }
  render() {
    const { isLoggedIn, redirectToHome } = this.props;
    if(!isLoggedIn)
      return null;
    const CTA = () => (<Card.CTA>
      <ThemedButton themeId={SERVICES.TRANSPORT.id}
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
            <p>You received your bus ticket claims.
              Your claims are stored in your uPort app.</p>
            <SuccessImage src={SuccessIcon} />
          </Card>
        </Col>
        <Col span={3}>
          <LikeDemo />
        </Col>
      </Grid>
    </Wrapper>);
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
