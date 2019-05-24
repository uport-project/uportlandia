import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { showAppDownload } from "../../selectors";
import * as theme from "../shared/theme";
import { Container, medium } from "../shared/grid";
import Header from "./Header";
import Card from "../shared/ServiceCard";
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
            name={SERVICES[sid].displayName}
            icon={SERVICES[sid].icon}
            superText={SERVICES[sid].entity}
            description={SERVICES[sid].description}
            shareClaims={SERVICES[sid].requiredClaims}
            shareServices={SERVICES[sid].requiredServices}
            receiveClaims={SERVICES[sid].generatedClaims}
            url={SERVICES[sid].url}
            colors={theme.colors[sid]} />)}
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
    padding: 1px 20px 30px;
    ${medium("padding: 1px 0 40px;")}
  }
`;

const mapStateToProps = state => ({
  showAppDownload: showAppDownload(state)
});

export default connect(mapStateToProps)(Home);
