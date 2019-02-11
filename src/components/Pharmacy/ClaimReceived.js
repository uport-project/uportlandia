import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import Services from "../shared/Services";
import SuccessIcon from "../../images/congratulations.svg";
import PharmacyLogo from "../../images/pharmacy-logo.png";

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
      <Button className="long" secondary onClick={redirectToHome}>
        Back to Home
      </Button>
    </Card.CTA>);
    return (<Wrapper>
      <Card CTA={CTA}>
        <h2>Congratulations!</h2>
        <p>You received your Prescription claims.
          Your claims are stored in your uPort app.</p>
        <SuccessImage src={SuccessIcon} />
      </Card>
    </Wrapper>)
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
