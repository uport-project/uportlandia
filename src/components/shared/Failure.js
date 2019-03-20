import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";
import { Container, Grid, Col, medium } from "../shared/grid";
import Card from "../shared/ServiceCard";
import { Button, InvLinkButton } from "../shared/elements";
import Services from "../shared/Services";
import ErrorIcon from "../../images/grumpy-face.svg";
import SERVICES from "../../constants/services";

class Failure extends React.Component {
  render() {
    const { heading, services } = this.props;
    return (<Wrapper>
      <Grid>
        <Col span={3}>
        </Col>
        <Col span={6}>
          <Heading>Uh, something went wrong</Heading>
          <Description>It seems like we couldn’t find required information in your uPort app. </Description>
          <ErrorImage src={ErrorIcon} />
        </Col>
        <Col span={3}>
        </Col>
      </Grid>
      <Cards>
        <Container>
          <h3>{heading}</h3>
          {services.map(service => <Card key={service.name}
            name={service.name}
            icon={service.icon}
            superText={service.entity}
            description={service.description}
            shareClaims={service.requiredClaims}
            shareServices={service.requiredServices}
            receiveClaims={service.generatedClaims}
            url={service.url} />)}
        </Container>
        <ButtonRow>
          <InvLinkButton to="/">Back to Dashboard</InvLinkButton>
        </ButtonRow>
      </Cards>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  padding-bottom: 30px;
`;
const Heading = styled.h2 `
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
`;
const Description = styled.p`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;
const ErrorImage = styled.img`
  display: block;
  margin: 45px auto;
`;
const Cards = styled.div`
  background: ${theme.gradient1};
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;

  ${Container} {
    padding: 40px 20px;
    & > h3 {
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0 auto;
      max-width: 800px;
      position: relative;
      text-transform: uppercase;
      top: 30px;
    }
  }

`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  margin-top: -10px;
`;

export default Failure;
