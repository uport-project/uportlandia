import React from "react";
import styled from "styled-components";

import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { ThemedButton } from "../shared/elements";
import getDependentServices from "../../utils/getDependentServices";
import Services from "../shared/Services";
import LikeDemo from "../shared/LikeDemo";
import SERVICES from "../../constants/services";

class ClaimExists extends React.Component {
  render() {
    const { redirectToHome } = this.props;
    return (<Wrapper>
      <Grid>
        <Col span={3} />
        <Col span={6}>
          <Card>
            <h2>You already have a uPortlandia City ID</h2>
            <p>
              With your City ID claims you have easy and quick access to
              numerous services and programs in uPortlandia.
            </p>
            <Services
              heading="Services that honor City ID claims"
              data={getDependentServices(SERVICES.CITY_ID.id)} />
            <ThemedButton themeId={SERVICES.CITY_ID.id} secondary onClick={redirectToHome}>
              View All
            </ThemedButton>
            <hr />
            <p>To make changes to your ID, please delete it from your uPort app and login again.</p>
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

export default ClaimExists;
