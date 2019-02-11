import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Body from "../shared/Body";
import Header from "./Header";
import * as theme from "../shared/theme";
import { Container, Grid, Col, medium } from "../shared/grid";
import Card from "./Card";
import CityIDIcon from "../../images/city-logo.png";
import DiplomaIcon from "../../images/university-logo.png";
import EmploymentIcon from "../../images/company-logo.png";
import InsuranceIcon from "../../images/insurance-logo.png";
import PharmacyIcon from "../../images/pharmacy-logo.png";
import TransportIcon from "../../images/transport-logo.png";
import MuseumIcon from "../../images/museum-logo.png";

class Home extends React.Component {
  render() {
    return (<Wrapper>
      <Hero>
        <Hero.Content>
          <h1>Welcome to Cleverland</h1>
          <p>
            Cleverland is an interactive demo that let’s you discover how to
            empower your identity using uPort. Collect claims. Unlock new
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
            url="/university" />

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
            url="/company" />

          <Card
            name="Insurance Coverage"
            icon={InsuranceIcon}
            superText="People Care Insurance LLC."
            description="Share your insurance information easily at your doctor’s office, pharmacy or at any emergency."
            shareClaims={[{
              name: "First Name",
              type: "required"
            }, {
              name: "Last Name",
              type: "required"
            }, {
              name: "Company Name",
              type: "required"
            }, {
              name: "Date of Employment",
              type: "required"
            }]}
            receiveClaims={[{
              name: "Policy Number"
            }, {
              name: "Group Number"
            }, {
              name: "Dependencies"
            }]}
            url="/insurance" />

          <Card
            name="Presciption Drug"
            icon={PharmacyIcon}
            superText="Your Health Medical Center"
            description="No more waiting for the doctor to call your pharmacy. Share your drug prescription at any drug store, any time."
            shareClaims={[{
              name: "First Name",
              type: "required"
            }, {
              name: "Last Name",
              type: "required"
            }, {
              name: "Policy Number",
              type: "required"
            }, {
              name: "Group Number",
              type: "required"
            }, {
              name: "Dependencies",
              type: "required"
            }]}
            receiveClaims={[{
              name: "Presciption Drug"
            }]}
            url="/pharmacy" />

          <Card
            name="Monthly Bus Ticket"
            icon={TransportIcon}
            superText="Cleverland City Transit"
            description="Are you a Cleverland citizen? Alumni of The Cleverland University? Get your montly bus ticket for free and enjoy the city trasportation!"
            shareClaims={[{
              name: "First Name",
              type: "required"
            }, {
              name: "Last Name",
              type: "required"
            }, {
              name: "Address",
              type: "required"
            }, {
              name: "Date of Birth",
              type: "required"
            }, {
              name: "Graduation Year",
              type: "required"
            }]}
            receiveClaims={[{
              name: "Monthly Bus Ticket"
            }]}
            url="/transport" />

          <Card
            name="Annual Membership"
            icon={MuseumIcon}
            superText="Cleverland Museum of Modern Art"
            description="Get a free membership with your City ID."
            shareClaims={[{
              name: "First Name",
              type: "required"
            }, {
              name: "Last Name",
              type: "required"
            }, {
              name: "Address",
              type: "required"
            }, {
              name: "Date of Birth",
              type: "required"
            }]}
            receiveClaims={[{
              name: "Annual Membership"
            }]}
            url="/museum" />
        </Container>
      </Cards>
    </Wrapper>)
  }
}

const Wrapper = styled.div``;
const Hero = styled.div`
  background: ${theme.main.bg};
`;
Hero.Content = styled(Container)`
  background: ${theme.main.bg};
  position: relative;
  text-align: center;
  top: 60px;
  z-index: 2;

  ${Wrapper} & {
    padding: 40px 15vw 100px;
  }
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
    padding: 40px 20px;
    ${medium("padding: 90px 0 40px;")}
  }
`;

export default Home;
