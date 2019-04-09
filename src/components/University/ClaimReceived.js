import React from "react";
import styled from "styled-components";

import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton } from "../shared/elements";
import Services from "../shared/Services";
import LikeDemo from "../shared/LikeDemo";
import SuccessIcon from "../../images/congratulations-diploma.svg";
import getDependentServices from "../../utils/getDependentServices";
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
    return (<Wrapper>
      <Grid>
        <Col span={3}>
        </Col>
        <Col span={6}>
          <Card>
            <h2>Congratulations!</h2>
            <p>You received your Diploma claims.
              Your claims are stored in your uPort app.</p>
            <SuccessImage src={SuccessIcon} />
            <hr />
            <h4>More than Diploma...</h4>
            <p>
              With your Diploma claims you gained an easy and quick access to
              numerous services and programs in uPortlandia.
            </p>
            <Services
              heading="Services that honor Diploma claims"
              data={getDependentServices(SERVICES.DIPLOMA.id)} />
            <ThemedButton themeId={SERVICES.DIPLOMA.id}
              secondary onClick={redirectToHome}
            >
              View All
            </ThemedButton>
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
  ${ThemedButton} {
    margin: 30px auto 0;
  }
`;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
  max-width: 100%;
`;

export default ClaimReceived;
