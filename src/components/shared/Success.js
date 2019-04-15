import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../actions";
import { isLoggedIn } from "../../selectors";
import * as theme from "./theme";
import { Grid, Col, Spacer, medium } from "./grid";
import { InvLinkButton } from "./elements";
import getDependentServices from "../../utils/getDependentServices";
import SuccessIcon from "../../images/congratulations-city.svg";
import Services from "./Services";
import LikeDemo from "./LikeDemo";
import Card from "./ServiceCard";
import Footer from "./Footer";
import SERVICES from "../../constants/services";

class Success extends React.Component {
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToHome();
    }
  }
  render() {
    const { id, isLoggedIn } = this.props;
    if(!isLoggedIn)
      return null;
    const deps = getDependentServices(SERVICES[id].id);
    return (<Wrapper>
      <TopHalf>
        <h2>Congratulations!</h2>
        <h3>You received your {SERVICES[id].name}</h3>
        <SuccessImage src={SuccessIcon} />
        <p>Your claims are stored in your uPort app.</p>
      </TopHalf>
      <BotHalf>
        <Grid>
          <Spacer span={1} />
          {deps.length
            ? <Col span={7}>
             <CardsLabel>Services that honor {SERVICES[id].name}</CardsLabel>
            {deps.map(service => (
              <Card key={service.id}
                name={service.name}
                icon={service.icon}
                superText={service.entity}
                description={service.description}
                shareClaims={service.requiredClaims}
                shareServices={service.requiredServices}
                receiveClaims={service.generatedClaims}
                url={service.url}
                colors={theme.colors[service.id]} />))}
            <Center>
              <InvLinkButton secondary to="/">
                Back to Dashboard
              </InvLinkButton>
            </Center>
          </Col>
          : null}
          <Col span={deps.length ? 3 : 10}>
            <LikeDemo />
          </Col>
        </Grid>
      </BotHalf>
      <Footer />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  background-color: ${theme.footer.bg};
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;

  footer {
    margin: 10px 0;
  }
  ${InvLinkButton} {
    margin: 30px auto;
  }
`;
const TopHalf = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;
const BotHalf = styled.div`
  background: ${theme.gradient1};
  padding: 30px 20px;
  position: relative;
  ${medium(`
    padding: 30px 0;
  `)};
`;
const CardsLabel = styled.h4`
  color: ${theme.colors.primaryButtonText};
  display: block
  font-size: 0.875rem;
  font-weight: 600;
  margin: 25px auto 0;
  max-width: 800px;
  text-transform: uppercase;
  & + .service-card {
    margin-top: calc(50px - 0.875rem - 25px);
  }
  ${medium(`
    height: 0.875rem;
  `)}
`;
const SuccessImage = styled.img`
  display: block;
  margin: 35px auto;
  max-width: 100%;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

function mapStateToProps(state) {
  return {
    isLoggedIn: isLoggedIn(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    redirectToHome() {
      dispatch(actions.redirectToHome());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
