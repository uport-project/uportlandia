import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import Services from "../shared/Services";
import ErrorIcon from "../../images/grumpy-face.svg";
import CityLogo from "../../images/city-logo.png";
import InsuranceLogo from "../../images/insurance-logo.png";
import SERVICES from "../../constants/services";

class Prerequisites extends React.Component {
  render() {
    return (<Wrapper>
      <Grid>
        <Col span={3}>
        </Col>
        <Col span={6}>
          <Card>
            <h2>Uh, something went wrong</h2>
            <p>It looks like you don’t have required claims in your uPort app.</p>
            <ErrorImage src={ErrorIcon} />
            <hr />
            <h4>Fear not!</h4>
            <p>
              You can get the required claims from the services below:
            </p>
            <Services
              heading="Services that issue claims required to get insurance"
              data={[SERVICES.CITY_ID, SERVICES.INSURANCE]} />
          </Card>
        </Col>
        <Col span={3}>
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
`;
const ErrorImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Prerequisites;
