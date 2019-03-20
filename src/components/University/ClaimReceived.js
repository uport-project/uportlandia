import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import Services from "../shared/Services";
import LikeDemo from "../shared/LikeDemo";
import SuccessIcon from "../../images/congratulations-diploma.svg";
import EmploymentLogo from "../../images/company-logo.png";
import getDependentServices from "../../utils/getDependentServices";
import SERVICES from "../../constants/services";

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
            <Button secondary onClick={this.props.redirectToHome}>
              View All
            </Button>
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
  ${Button} {
    margin: 30px auto 0;
  }
`;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
  max-width: 100%;
`;

export default ClaimReceived;
