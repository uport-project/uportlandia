import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import dayjs from "dayjs";
import { withTranslation, Trans } from "react-i18next";

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
import validate from "../../utils/validateRegnClaim";
import { SERVICES, registration } from "../../constants/config";

const { serviceId } = registration;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: Object.keys(registration.form).reduce((acc, val) => ({
        ...acc,
        [val]: registration.form[val].defaultValue
      }), {}),
      validationError: null
    };
  }
  componentDidMount() {
    const {
      data,
      profile,
      isLoggedIn,
      redirectToRegnHome,
      redirectToRegnExists
    } = this.props;
    if(!isLoggedIn)
      redirectToRegnHome();
    if(profile &&
      profile[SERVICES[serviceId].claim] &&
      validate(profile[SERVICES[serviceId].claim]).valid
    ) {
      redirectToRegnExists();
    }
    this.setState({ details: data });
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
    ev.preventDefault();
    const validation = validate(this.state.details);
    if(validation.valid) {
      this.setState({ validationError: null });
      this.props.onSubmit(this.state.details);
    } else {
      this.setState({
        validationError: {
          fieldId: validation.fieldId,
          message: validation.error
        }
      });
    }
    return false;
  }
  render() {
    const { isLoggedIn, t } = this.props;
    const { details, validationError } = this.state;
    if(!isLoggedIn)
      return <Redirect to={SERVICES[serviceId].url} />;
    const CTA = () => (<Card.CTA>
      <ThemedButton
        themeId={SERVICES[serviceId].id}
        className="long"
        secondary
        onClick={this.handleSubmit}
      >{t("Submit")}</ThemedButton>
    </Card.CTA>);
    return (<Wrapper>
      <Grid>
        <SidebarLeft service={SERVICES[serviceId]} active={1} />
        <Col span={6}>
          <Card CTA={CTA}>
            <h2>{t("regnFormHeading")}</h2>
            <p>
              {t("regnFormLabel1")}
              {" "}
              {t(SERVICES[serviceId].entity)}
              {" "}
              {t("regnFormLabel2")}
            .</p>
            <ReqdMessage>{t("* indicates required field")}</ReqdMessage>

            <Form onSubmit={this.handleSubmit}>
              <Grid>
                {Object.keys(registration.form).map(fieldId => createFormField(
                  fieldId,
                  registration.form[fieldId],
                  details[fieldId],
                  this.handleChange(fieldId),
                  validationError,
                  t
                ))}
              </Grid>
              <hr />
              <h4>{t("What's next?")}</h4>
              <p>
                {t("Your information will be verified")}
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

const createFormField = (id, config, value, onChange, validationError, t) => {
  switch(config.type) {
    case "dropdown":
      return (<Col span={6} key={id}>
        <FormGroup>
          <Label>
            {t(config.label)}
            {!config.required || "*"}
          </Label>
          <Dropdown
            value={value}
            onChange={onChange}>
            <option> {t(config.placeholder)} </option>
            {config.items.map(c => (<option key={c.id} value={c.id}>
              {c.name}
            </option>))}
          </Dropdown>
          <ErrorMsg show={validationError && validationError.fieldId===id}>
            {t("This field is required")}
          </ErrorMsg>
        </FormGroup>
      </Col>);

    case "date":
      return (<Col span={6} key={id}>
        <FormGroup>
          <Label>
            {t(config.label)}
            {!config.required || "*"}
          </Label>
          <input type="date"
            className="datepicker"
            min={config.min}
            max={config.max}
            onChange={ev => onChange({
              ...ev,
              target: {
                ...ev.target,
                value: dayjs(ev.target.value).format("YYYY-MM-DD")
              }
            })}
            placeholder={config.placeholder}
            value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
          />
          <ErrorMsg show={validationError && validationError.fieldId==="dob"}>
            {validationError && validationError.message}
          </ErrorMsg>
        </FormGroup>
      </Col>);

    case "tnc":
      return (<Col span={12} key={id}>
        <label>
          <input
            type="checkbox"
            checked={value}
            onChange={onChange} />
          <Trans i18nKey="agreeTnC">
            <span>{config.label}</span>
            <a
              href={config.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.linkLabel}
            </a>
          </Trans>
        </label>
        <ErrorMsg show={validationError && validationError.fieldId===id}>
          {t("You must accept the terms and Conditions")}
        </ErrorMsg>
      </Col>);

    case "text":
    default:
      return (<Col span={6} key={id}>
        <FormGroup>
          <Label>
            {t(config.label)}
            {!config.required || "*"}
          </Label>
          <Textbox
            value={value}
            onChange={onChange} />
          <ErrorMsg show={validationError && validationError.fieldId===id}>
            {t("This field is required")}
          </ErrorMsg>
        </FormGroup>
      </Col>);
  }
};

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

export default withTranslation()(RegistrationForm);
