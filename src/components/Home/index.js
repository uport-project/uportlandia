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
import HeroImage from "../../images/home-hero.png";

class Home extends React.Component {
  render() {
    return (<Wrapper>
      <Hero>
        <Hero.BannerContainer>
          <Hero.Banner src={HeroImage} />
        </Hero.BannerContainer>
        <Hero.Content>
          <h1>Welcome to Cleverland</h1>
          <p>
            In the smart city of the future, gone are the days of having to
            take time out of your day to stand in long lines to get anything
            accomplished. After creating your identity, everything from going
            to a doctor to visiting a museum can be done safely and securely
            from anywhere at any time from your uPort app.
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
              name: "Address",
              honoredBy: ["The University of Cleverland", "People Care Insurance LLC", "Cleverland Museum of Modern Art", "Cleverland City Transit", "Your Health Medical Center"]
            }, {
              name: "Date of Birth",
              honoredBy: ["The University of Cleverland", "People Care Insurance LLC", "Cleverland Museum of Modern Art", "Cleverland City Transit", "Your Health Medical Center"]
            }]}
            url="/city" />

          <Card
            name="Diploma"
            icon={DiplomaIcon}
            superText="The university of Cleverland"
            description="Get a verified digital copy of your diploma. Share it easily at you next job interview or while applying to post graduate program."
            shareClaims={[{
              name: "First Name",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Last Name",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Date of Birth",
              issuedBy: ["The City of Cleverland"]
            }]}
            receiveClaims={[{
              name: "School Name",
              honoredBy: ["People Care Insurance LLC", "Dream Job LLC"]
            }, {
              name: "Program Name",
              honoredBy: ["People Care Insurance LLC", "Dream Job LLC"]
            }, {
              name: "Final Grades",
              honoredBy: ["People Care Insurance LLC", "Dream Job LLC"]
            }, {
              name: "Graduation Year",
              honoredBy: ["People Care Insurance LLC", "Dream Job LLC"]
            }]}
            url="/university" />

          <Card
            name="Employment Verification"
            icon={EmploymentIcon}
            superText="DREAM JOB LLC."
            description="Share confirmation of your employment easily. No more collecting stacks of documents to apply for a mortgage or sign a lease."
            shareClaims={[{
              name: "First Name",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Last Name",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "School Name",
              issuedBy: ["The University of Cleverland"]
            }, {
              name: "Program Name",
              type: "required",
              issuedBy: ["The University of Cleverland"]
            }, {
              name: "Final Grades",
              issuedBy: ["The University of Cleverland"]
            }]}
            receiveClaims={[{
              name: "Company Name",
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
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Last Name",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Company Name",
              issuedBy: ["Dream Job LLC"]
            }, {
              name: "Date of Employment",
              issuedBy: ["Dream Job LLC"]
            }]}
            receiveClaims={[{
              name: "Policy Number",
              honoredBy: ["Your Health Medical Center"]
            }, {
              name: "Group Number",
              honoredBy: ["Your Health Medical Center"]
            }, {
              name: "Dependencies",
              honoredBy: ["Your Health Medical Center"]
            }]}
            url="/insurance" />

          <Card
            name="Presciption Drug"
            icon={PharmacyIcon}
            superText="Your Health Medical Center"
            description="No more waiting for the doctor to call your pharmacy. Share your drug prescription at any drug store, any time."
            shareClaims={[{
              name: "First Name",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Last Name",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Policy Number",
              type: "required",
              issuedBy: ["People Care Insurance LLC"]
            }, {
              name: "Group Number",
              type: "required",
              issuedBy: ["People Care Insurance LLC"]
            }, {
              name: "Dependencies",
              type: "required",
              issuedBy: ["People Care Insurance LLC"]
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
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Last Name",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Address",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Date of Birth",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Graduation Year",
              type: "required",
              issuedBy: ["The University of Cleverland"]
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
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Last Name",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Address",
              type: "required",
              issuedBy: ["The City of Cleverland"]
            }, {
              name: "Date of Birth",
              type: "required",
              issuedBy: ["The City of Cleverland"]
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
  background: ${theme.gradient1};
  position: relative;
`;
Hero.BannerContainer = styled.div`
  display: none;
  min-height: 300px;
  position: absolute;
  width: 100%;
  z-index: 1;
  ${medium("display: block;")}
`;
Hero.Banner = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
Hero.Content = styled.div`
  color: ${theme.homeHeader.textColor};
  position: relative;
  z-index: 2;
  text-align: center;

  ${Wrapper} & {
    padding: 10vh 20px;
    ${medium("padding: 25vh 25vw 25vh;")}
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

  ${Container} {
    padding: 40px 20px;
    ${medium("padding: 50px 0 40px;")}
  }
`;

export default Home;
