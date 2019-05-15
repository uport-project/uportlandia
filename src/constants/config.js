import dayjs from "dayjs";

import SERVICES from "./services";
import COUNTRIES from "./countries";
import logo from "../images/uport-logo.svg";

export const home = {
  logo: logo,
  logoLink: "https://uport.me/",
  name: "uPortlandia"
};

export const registration = {
  path: "/city",
  name: "City ID",
  serviceId: "CITY_ID",
  text: {
    landingSteps: [
      "regnLandingStep1",
      "regnLandingStep2",
      "regnLandingStep3"
    ]
  },
  form: {
    firstName: {
      label: "First Name",
      defaultValue: "",
      type: "text",
      required: true
    },
    lastName: {
      label: "Last Name",
      defaultValue: "",
      type: "text",
      required: true
    },
    address: {
      label: "Address",
      defaultValue: "",
      type: "text",
      required: true
    },
    city: {
      label: "City",
      defaultValue: "",
      type: "text",
      required: true
    },
    province: {
      label: "State or Province",
      defaultValue: "",
      type: "text",
      required: true
    },
    zipCode: {
      label: "Zip Code",
      defaultValue: "",
      type: "text",
      required: true
    },
    country: {
      label: "Country",
      defaultValue: "",
      type: "dropdown",
      items: COUNTRIES,
      required: true
    },
    dob: {
      label: "Date of Birth",
      defaultValue: "",
      placeholder: "YYYY-MM-DD",
      type: "date",
      min: "1900-01-01",
      max: dayjs().add(-13, "year").format("YYYY-MM-DD"),
      required: true,
      isValid: value => {
        const today = dayjs();
        if(!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
          !dayjs(value).isValid() ||
          dayjs(value).year() > today.year() - 13 ||
          dayjs(value).year() < 1900
        ) {
          return {
            valid: false,
            fieldId: "dob",
            error: "Invalid date of birth"
          };
        }
        return { valid: true };
      }
    },
    toc: {
      label: "I agree to the uPort",
      defaultValue: false,
      link: "https://www.uport.me/terms-conditions",
      linkLabel: "Terms and Conditions",
      type: "tnc",
      required: true,
      validationError: "You must agree to the terms and conditions"
    }
  }
};

export const routes = Object.keys(SERVICES).map(serviceId => ({
  path: SERVICES[serviceId].url,
  serviceId
}));
