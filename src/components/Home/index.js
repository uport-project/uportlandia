import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Body from "../shared/Body";
import Header from "../shared/Header";
import * as theme from "../shared/theme";
import { Container, Grid, Col } from "../shared/grid";
import Card from "./Card";
import CityIDIcon from "../../images/city-id-icon.svg";
import DiplomaIcon from "../../images/diploma-icon.svg";
import EmploymentIcon from "../../images/employment-icon.svg";

class Home extends React.Component {
  render() {
    return (<div>
      <Hero>
        <Hero.Content>
          <h1>Welcome to Cleverland</h1>
          <p>
            Cleverland is an interactive demo that let’s you discover how to
            empower your identity using uPort. Collect claims. Unclock new
            services. Manage your own data.
          </p>
        </Hero.Content>
      </Hero>
      <Cards>
        <Container>
          <Card
            name="City ID"
            icon={CityIDIcon}
            superText="The City of Cleverland"
            description="Identify yourself with one click. Get a digital City ID. Enjoy quick, seamless, and often free access to many city services."
            receiveClaims={[{
              name: "Address"
            }, {
              name: "Date of Birth"
            }]}
            url="/city" />

          <Card
            name="Diploma"
            icon={DiplomaIcon}
            superText="The university of Cleverland"
            description="Get a verified digital copy of your diploma. Share it easily at you next job interview or while applying to post graduate program."
            shareClaims={[{
              name: "First Name",
              type: "required"
            }, {
              name: "Last Name",
              type: "required"
            }, {
              name: "Date of Birth",
              type: "required"
            }]}
            receiveClaims={[{
              name: "School Name"
            }, {
              name: "Program Name"
            }, {
              name: "Final Grades"
            }, {
              name: "Graduation Year"
            }]}
            url="/diploma" />

          <Card
            name="Employment Verification"
            icon={EmploymentIcon}
            superText="DREAM JOB LLC."
            description="Share confirmation of your employment easily. No more collecting stacks of documents to apply for a mortgage or sign a lease."
            shareClaims={[{
              name: "First Name",
              type: "required"
            }, {
              name: "Last Name",
              type: "required"
            }, {
              name: "School Name",
              type: "required"
            }, {
              name: "Program Name",
              type: "required"
            }, {
              name: "Final Grades",
              type: "optional"
            }]}
            receiveClaims={[{
              name: "Company Name"
            }, {
              name: "Salary"
            }, {
              name: "Date of Employment"
            }]}
            url="" />
        </Container>
      </Cards>
    </div>)
  }
}

const Hero = styled.div`
  background: ${theme.main.bg};
`;
Hero.Content = styled(Container)`
  background: ${theme.main.bg};
  padding: 40px 15vw 100px;
  position: relative;
  text-align: center;
  top: 60px;
  z-index: 2;

  h1 {
    font-size: 2.375rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.5rem;
    line-height: 1.25;
  }
`;
const Cards = styled.div`
  background: ${theme.gradient1};
  position: relative;
  z-index: 1;

  ${Container} {
    padding: 90px 0 40px;
  }
`;

export default Home;
