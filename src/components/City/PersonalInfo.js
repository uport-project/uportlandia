import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";

import * as theme from "../shared/theme";
import { Grid, Col } from "../shared/grid";
import Card from "../shared/ContentCard";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Dropdown,
  textBoxStyle,
  Textbox
} from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import COUNTRIES from "../../constants/countries";
import SuccessIcon from "../../images/smiley-face.svg";

import "react-datepicker/dist/react-datepicker.css";
import "../../css/datepicker.css";

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
      this.setState({ validationError: validation.error });
      if(this.errorHandle)
        clearTimeout(this.errorHandle);
      this.errorHandle = setTimeout(() => {
        this.setState({ validationError: null });
      }, 4000);
    }
    return false;
  }
  render() {
    const { isLoggedIn } = this.props;
    const { isSubmitted, details, validationError } = this.state;
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
      <Button className="long" secondary onClick={this.handleSubmit}>Submit</Button>
    </Card.CTA>);
    return (<Wrapper>
      <Card CTA={CTA}>
        <h2>Personal Information</h2>
        <p>Submit your information to the City of Cleverland to confirm your
          identity.</p>
        <ReqdMessage>All fields are required</ReqdMessage>
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
              <Dropdown
                placeholder="Country"
                value={country}
                onChange={this.handleChange("country")}>
                <option> Country </option>
                {COUNTRIES.map(c => (<option key={c.code} value={c.code}>
                  {c.name}
                </option>))}
              </Dropdown>
            </Col>
            <Col span={5}>
              <FormGroup>
                <Label>Date of Birth</Label>
                <input type="date"
                  className="datepicker"
                  min="1900-01-01"
                  max={dayjs().add(-13, "year").format("YYYY-MM-DD")}
                  onChange={this.handleChange("dob")}
                  value={dob}
                />
              </FormGroup>
            </Col>
            <Col span={12}>
              <label>
                <input
                  type="checkbox"
                  checked={toc}
                  onChange={this.handleChange("toc")} />
                <span>I agree to the uPort </span>
                <a href="https://www.uport.me/terms-conditions" target="_blank">
                  Terms and Conditions
                </a>
              </label>
            </Col>
          </Grid>
          <Error show={Boolean(validationError)}>
            {validationError || "&nbsp;"}
          </Error>
          <hr />
          <h4>What’s next?</h4>
          <p>
            Your information will be verified by one of our identity
            verification partners. Think about is as a background check but
            faster and more secure.
          </p>
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
  .datepicker {
    ${textBoxStyle}
  }
`;
const ReqdMessage = styled.p`
  color: ${theme.colors.textSecondary};
  font-weight: 600;
`;
const Error = styled.div`
  background: ${theme.colors.errorBg};
  font-size: 0.75rem;
  color: ${theme.colors.error};
  margin: 20px 0 0;
  padding: 15px;
  ${props => props.show ? "opacity: 1;" : "opacity: 0;"}
  transition: opacity 0.2s;
`;

export default PersonalInfo;
