import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button, Form, FormGroup, Label, Textbox } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face.svg";

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        dob: "",
        toc: false
      }
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn)
      this.props.redirectToCityHome();
  }
  handleChange = fieldId => ev => {
    const { details } = this.state;
    if(ev.target.type === "checkbox") {
      this.setState({
        details: {
          ...details,
          [fieldId]: ev.target.checked
        }
      });
    } else {
      this.setState({
        details: {
          ...details,
          [fieldId]: ev.target.value
        }
      });
    }
  }
  handleSubmit = ev => {
    console.log(this.state);
    ev.preventDefault();
    if(isValid(this.state.details)) {
      this.props.onSubmit(this.state.details);
    }
    return false;
  }
  render() {
    const { isLoggedIn } = this.props;
    const { isSubmitted, details } = this.state;
    const {
      firstName,
      lastName,
      address,
      city,
      zipCode,
      country,
      dob,
      toc
    } = details;
    if(!isLoggedIn)
      return null;
    return (<Wrapper>
      <Card>
        <h2>Personal Information</h2>
        <p>Submit your information to the City of Cleverland to confirm your
          identity.</p>
        <p>All fields are required</p>
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            <Col span={6}>
              <FormGroup>
                <Label>First Name</Label>
                <Textbox
                  value={firstName}
                  onChange={this.handleChange("firstName")} />
              </FormGroup>
            </Col>
            <Col span={6}>
              <FormGroup>
                <Label>Last Name</Label>
                <Textbox
                  value={lastName}
                  onChange={this.handleChange("lastName")} />
              </FormGroup>
            </Col>
            <Col span={12}>
              <FormGroup>
                <Label>Address</Label>
                <Textbox
                  placeholder="Number, Street Name, Apt #"
                  value={address}
                  onChange={this.handleChange("address")} />
              </FormGroup>
            </Col>
            <Col span={4}>
              <Textbox
                placeholder="City"
                value={city}
                onChange={this.handleChange("city")} />
            </Col>
            <Col span={4}>
              <Textbox
                type="number"
                placeholder="Zip Code"
                value={zipCode}
                onChange={this.handleChange("zipCode")} />
            </Col>
            <Col span={4}>
              <Textbox
                placeholder="Country"
                value={country}
                onChange={this.handleChange("country")} />
            </Col>
            <Col span={4}>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Textbox
                  placeholder="mm/dd/yyyy"
                  value={dob}
                  onChange={this.handleChange("dob")} />
              </FormGroup>
            </Col>
            <Col span={12}>
              <label>
                <input
                  type="checkbox"
                  checked={toc}
                  onChange={this.handleChange("toc")} />
                <span>I agree to the uPort terms and conditions</span>
              </label>
            </Col>
          </Grid>
          <hr />
          <h4>What’s next?</h4>
          <p>
            Your information will be verified by one of our identity
            verification partners. Think about is as a background check but
            faster and more secure.
          </p>
          <Button secondary disabled={!isValid(details)}>Submit</Button>
        </Form>
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
  input[type="checkbox"] {
    margin-right: 10px;
  }
`;

export default PersonalInfo;
