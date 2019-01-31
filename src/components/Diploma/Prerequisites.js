import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import ErrorIcon from "../../images/grumpy-face.svg";
import CityLogo from "../../images/city-id-icon.svg";

class Prerequisites extends React.Component {
  render() {
    return (<Wrapper>
      <Card>
        <h2>Uh, something went wrong</h2>
        <p>It looks like you don’t have required claims in your uPort app.</p>

        <ErrorImage src={ErrorIcon} />
        <hr />
        <h4>Fear not!</h4>
        <p>
          You can get the required claims from the services below:
        </p>

        <Services>Services that issue claims required to get the diploma</Services>
        <Service>
          <Service.Header to="/city">
            <Service.Logo src={CityLogo} />
            <Service.Header.Sub>The City of Cleverland</Service.Header.Sub>
            <Service.Header.Main>City ID</Service.Header.Main>
          </Service.Header>
        </Service>
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
const ErrorImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;
const Services = styled.h5`
  font-size: 0.6875rem;
  margin: 40px 0 10px;
  text-transform: uppercase;
`;
const Service = styled.div`
  background: ${theme.main.bg};
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(63, 61, 75, 0.1);
  padding: 10px 20px;
`;
Service.Header = styled(Link)`
  display: grid;
  grid-gap: 0 10px;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 2fr 3fr;
  text-decoration: none;
`;
Service.Header.Main = styled.h4`
  align-self: center;
  font-size: 1.125rem;
  font-weight: 600;
  ${Wrapper} & {
    color: ${theme.colors.text};
  }
`;
Service.Header.Sub = styled.div`
  align-self: end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 600;
  grid-area: 1 / 2 / 2 / 3;
  text-transform: uppercase;
`;
Service.Logo = styled.img`
  grid-area: 1 / 1 / 3 / 2;
`;

export default Prerequisites;
