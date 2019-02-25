import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as actions from "../../actions";
import { showAppDownload } from "../../selectors";
import Body from "../shared/Body";
import * as theme from "../shared/theme";
import { Container, Grid, Col, medium } from "../shared/grid";
import Header from "./Header";
import Card from "./Card";
import AppDownload from "./AppDownloadContainer";
import SERVICES from "../../constants/services";

class Home extends React.Component {
  render() {
    const { showAppDownload } = this.props;
    return (<Wrapper extraPadding={showAppDownload}>
      <Header />
      <Cards>
        <Container>
          {Object.keys(SERVICES).map(sid => <Card key={sid}
            name={SERVICES[sid].name}
            icon={SERVICES[sid].icon}
            superText={SERVICES[sid].entity}
            description={SERVICES[sid].description}
            shareClaims={SERVICES[sid].requiredClaims}
            receiveClaims={SERVICES[sid].generatedClaims}
            url={SERVICES[sid].url} />)}
        </Container>
      </Cards>
      <AppDownload />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ${props => props.extraPadding
    ? `padding-bottom: 6rem;`
    : ""}
`;
const Cards = styled.div`
  background: ${theme.gradient1};

  ${Container} {
    padding: 40px 20px;
    ${medium("padding: 90px 0 40px;")}
  }
`;

const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Home);
