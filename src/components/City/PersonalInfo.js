import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import SidebarLeft from "../shared/SidebarLeft";
import Security from "./Security";
import {
  Form,
  FormGroup,
  Label,
  Dropdown,
  textBoxStyle,
  Textbox,
  ThemedButton
} from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import COUNTRIES from "../../constants/countries";
import SERVICES from "../../constants/services";

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
      },
      validationError: null
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn)
      this.props.redirectToCityHome();
    const { data } = this.props;
    this.setState({ details: data });
  }
  componentWillUnmount() {
    clearTimeout(this.errorHandle);
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
  handleChangeDOB = date => {
    const { details } = this.state;
    this.setState({
      details: {
        ...details,
        dob: dayjs(date).format("MM/DD/YYYY")
      }
    });
  }
  handleSubmit = ev => {
    ev.preventDefault();
    const validation = isValid(this.state.details);
    if(validation.valid) {
      this.props.onSubmit(this.state.details);
    } else {
      this.setState({
        validationError: {
          fieldId: validation.fieldId,
          message: validation.error
        }
      });
      // if(this.errorHandle)
      //   clearTimeout(this.errorHandle);
      // this.errorHandle = setTimeout(() => {
      //   this.setState({ validationError: null });
      // }, 4000);
    }
    return false;
  }
  render() {
    const { isLoggedIn } = this.props;
    const { details, validationError } = this.state;
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
    const CTA = () => (<Card.CTA>
      <ThemedButton
        themeId={SERVICES.CITY_ID.id}
        className="long"
        secondary
        onClick={this.handleSubmit}
      >Submit</ThemedButton>
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES.CITY_ID} active={1} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>Personal Information</h2>
            <p>Submit your information to {SERVICES.CITY_ID.entity} to confirm your
              identity.</p>
            <ReqdMessage>* indicates required field</ReqdMessage>
            <Form onSubmit={this.handleSubmit}>
              <Grid>
                <Col span={6}>
                  <FormGroup>
                    <Label>First Name *</Label>
                    <Textbox
                      value={firstName}
                      onChange={this.handleChange("firstName")} />
                    <ErrorMsg show={validationError && validationError.fieldId==="firstName"}>
                      This field is required
                    </ErrorMsg>
                  </FormGroup>
                </Col>
                <Col span={6}>
                  <FormGroup>
                    <Label>Last Name *</Label>
                    <Textbox
                      value={lastName}
                      onChange={this.handleChange("lastName")} />
                    <ErrorMsg show={validationError && validationError.fieldId==="lastName"}>
                      This field is required
                    </ErrorMsg>
                  </FormGroup>
                </Col>
                <Col span={12}>
                  <FormGroup>
                    <Label>Address *</Label>
                    <Textbox
                      placeholder="Number, Street Name, Apt #"
                      value={address}
                      onChange={this.handleChange("address")} />
                    <ErrorMsg show={validationError && validationError.fieldId==="address"}>
                      This field is required
                    </ErrorMsg>
                  </FormGroup>
                </Col>
                <Col span={4}>
                  <Textbox
                    placeholder="City"
                    value={city}
                    onChange={this.handleChange("city")} />
                  <ErrorMsg show={validationError && validationError.fieldId==="city"}>
                    This field is required
                  </ErrorMsg>
                </Col>
                <Col span={4}>
                  <Textbox
                    type="number"
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={this.handleChange("zipCode")} />
                  <ErrorMsg show={validationError && validationError.fieldId==="zipCode"}>
                    This field is required
                  </ErrorMsg>
                </Col>
                <Col span={4}>
                  <Dropdown
                    placeholder="Country"
                    value={country}
                    onChange={this.handleChange("country")}>
                    <option> Country </option>
                    {COUNTRIES.map(c => (<option key={c.code} value={c.code}>
                      {c.name}
                    </option>))}
                  </Dropdown>
                  <ErrorMsg show={validationError && validationError.fieldId==="country"}>
                    This field is required
                  </ErrorMsg>
                </Col>
                <Col span={5}>
                  <FormGroup>
                    <Label>Date of Birth *</Label>
                    <input type="date"
                      className="datepicker"
                      min="1900-01-01"
                      max={dayjs().add(-13, "year").format("YYYY-MM-DD")}
                      onChange={this.handleChange("dob")}
                      placeholder="YYYY-MM-DD"
                      value={dob}
                    />
                    <ErrorMsg show={validationError && validationError.fieldId==="dob"}>
                      {validationError && validationError.message}
                    </ErrorMsg>
                  </FormGroup>
                </Col>
                <Col span={12}>
                  <label>
                    <input
                      type="checkbox"
                      checked={toc}
                      onChange={this.handleChange("toc")} />
                    <span>I agree to the uPort </span>
                    <a
                      href="https://www.uport.me/terms-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  <ErrorMsg show={validationError && validationError.fieldId==="toc"}>
                    You must accept the terms and Conditions
                  </ErrorMsg>
                </Col>
              </Grid>
              <hr />
              <h4>What’s next?</h4>
              <p>
                Your information will be verified by one of our identity
                verification partners. Think about is as a background check but
                faster and more secure.
              </p>
            </Form>
          </Card>
        </Col>
        <Col span={3}>
          <Security />
        </Col>
      </Grid>
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  input[type="checkbox"] {
    margin-right: 10px;
  }
  .datepicker {
    ${textBoxStyle}
  }
`;
const ReqdMessage = styled.p``;
const ErrorMsg = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.error};
  margin: 5px 0 0;
  ${props => props.show ? "opacity: 1;" : "opacity: 0;"}
  transition: opacity 0.2s;
`;

export default PersonalInfo;
