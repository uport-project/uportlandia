import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import Services from "../shared/Services";
import SuccessIcon from "../../images/congratulations.svg";
import PharmacyLogo from "../../images/pharmacy-logo.png";

class ClaimReceived extends React.Component {
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToDiplomaHome();
    }
  }
  render() {
    const { data, redirectToHome } = this.props;
    if(!this.props.isLoggedIn)
      return null;
    const CTA = () => (<Card.CTA>
      <Button className="long" secondary onClick={redirectToHome}>
        Back to Home
      </Button>
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
        </Col>
      </Grid>
    </Wrapper>);
  }
}

const Wrapper = styled.div`
  ul {
    list-style: disc;
    margin-left: 20px;
    li + li {
      margin-top: 15px;
    }
  }
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
