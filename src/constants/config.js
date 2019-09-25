import dayjs from "dayjs";

// Images/Logos
import logo from "../images/serto-black-horiz.svg";
import DriversLicenseIcon from "../images/drivers-license-logo.png";
import SafeDriverIcon from "../images/safe-driver-logo.png";
import CarLoanIcon from "../images/car-loan-logo.png";
import CarDealerIcon from "../images/car-dealer-logo.png";
import InsuranceIcon from "../images/insurance-logo.png";
import RideSharingIcon from "../images/ride-sharing-logo.png";
import InvestmentsIcon from "../images/investments-logo.png";
import COUNTRIES from "./countries";

import getSignerUrl from "./signerUrl";

// Home Page
export const home = {
  logo,
  logoLink: "https://uport.me/",
  name: "Serto Ecosystems"
};

// Registration Flow
export const registration = {
  path: "/DRIVERS_LICENSE",
  name: "Driver'sLicense",
  serviceId: "DRIVERS_LICENSE",
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

const DRIVERS_LICENSE = { // This should match the Registration Config
  id: "DRIVERS_LICENSE",
  name: "Driver's License",
  displayName: "driversLicenseDisplayName",
  icon: DriversLicenseIcon,
  entity: "Vericheck Identity Verifier",
  description: "driversLicenseDescription",
  url: "/drivers_license",
  claim: "Driver'sLicense",
  steps: [
    "driversLicenseStep1",
    "driversLicenseStep2",
    "driversLicenseStep3",
    "driversLicenseStep4"
  ]
};

// All Services
const SAFE_DRIVER = {
  id: "SAFE_DRIVER",
  name: "Safe Driver Badge",
  displayName: "safeDriverDisplayName",
  icon: SafeDriverIcon,
  entity: "Mappe Maps & Navigation",
  description: "safeDriverDescription",
  url: "/safe_driver",
  claim: "Safe Driver Badge",
  heading: "safeDriverHeading",
  steps: [
    "safeDriverStep1",
    "safeDriverStep2",
    "safeDriverStep3"
  ],
  details: [
    "safeDriverDetail1",
    "safeDriverDetail2"
  ],
  claimData: {
    "Safe Driver": "Yes"
  }
};

const CAR_LOAN = {
  id: "CAR_LOAN",
  name: "Simple Fund Bank",
  displayName: "carLoanDisplayName",
  icon: CarLoanIcon,
  entity: "Simple Fund Bank",
  heading: "carLoanHeading",
  description: "carLoanDescription",
  getCTA: "Get Qualified",
  url: "/car_loan",
  claim: "Car Loan Qualification",
  steps: [
    "carLoanStep1",
    "carLoanStep2",
    "carLoanStep3"
  ],
  details: [
    "carLoanDetail1",
    "carLoanDetail2"
  ],
  claimData: {
    "Qualifies for Car Loan": "Yes"
  }
};

const CAR_DEALER = {
  id: "CAR_DEALER",
  name: "Car Title",
  displayName: "carDealerDisplayName",
  icon: CarDealerIcon,
  entity: "McQuinn Car Dealership",
  heading: "carDealerHeading",
  description: "carDealerDescription",
  getCTA: "Get Brand New Car",
  url: "/car_dealer",
  claim: "Car Title",
  steps: [
    "carDealerStep1",
    "carDealerStep2",
    "carDealerStep3"
  ],
  details: [
    "carDealerDetail1",
    "carDealerDetail2"
  ],
  claimData: {
    "Dummy 1": "Yes",
    "Dummy 2": "Yes"
  }
};

const INSURANCE = {
  id: "INSURANCE",
  name: "Car Insurance",
  displayName: "insuranceDisplayName",
  icon: InsuranceIcon,
  entity: "Better Safe Insurance Company",
  heading: "insuranceHeading",
  description: "insuranceDescription",
  url: "/insurance",
  claim: "Car Insurance",
  steps: [
    "insuranceStep1",
    "insuranceStep2",
    "insuranceStep3"
  ],
  details: [
    "insuranceDetail1",
    "insuranceDetail2"
  ],
  claimData: {
    "Dummy 1": "Yes"
  }
};

const RIDE_SHARING = {
  id: "RIDE_SHARING",
  name: "Driver Verification",
  displayName: "rideSharingDisplayName",
  icon: RideSharingIcon,
  entity: "Ride Away Ride-Sharing App",
  heading: "rideSharingHeading",
  description: "rideSharingDescription",
  getCTA: "Become a Driver",
  url: "/ride_sharing",
  claim: "Driver Verification",
  steps: [
    "rideSharingStep1",
    "rideSharingStep2",
    "rideSharingStep3"
  ],
  details: [
    "rideSharingDetail1",
    "rideSharingDetail2"
  ],
  claimData: {
    "Dummy 1": "Yes"
  }
};

const INVESTMENTS = {
  id: "INVESTMENTS",
  name: "Ride Away Stock Purchase Plan",
  displayName: "investmentsDisplayName",
  icon: InvestmentsIcon,
  entity: "Global Capital Investments",
  heading: "investmentsHeading",
  description: "investmentsDescription",
  getCTA: "Become a Shareholder",
  url: "/investments",
  claim: "Ride Away Stock Purchase Plan",
  steps: [
    "investmentsStep1",
    "investmentsStep2",
    "investmentsStep3"
  ],
  details: [
    "investmentsDetail1",
    "investmentsDetail2"
  ],
  claimData: {
    "Dummy 1": "Yes"
  }
};

const YOURSELF = {
  id: "YOURSELF",
  name: "Yourself, Any Issuer",
  displayName: "Yourself, Any Issuer",
  icon: DriversLicenseIcon,
  entity: "Yourself, Any Issuer",
  description: "Yourself, Any Issuer"
};

// Claims
const FIRST_NAME = {
  id: "firstName",
  name: "First Name",
  displayName: "First Name",
  issuedBy: [DRIVERS_LICENSE],
  honoredBy: [SAFE_DRIVER]
};

const LAST_NAME = {
  id: "lastName",
  name: "Last Name",
  displayName: "Last Name",
  issuedBy: [DRIVERS_LICENSE],
  honoredBy: [SAFE_DRIVER]
};

const DATE_OF_BIRTH = {
  id: "dob",
  name: "Date of Birth",
  displayName: "Date of Birth",
  issuedBy: [DRIVERS_LICENSE],
  honoredBy: [SAFE_DRIVER]
};

const ADDRESS = {
  id: "address",
  name: "Address",
  displayName: "Address",
  issuedBy: [DRIVERS_LICENSE],
  honoredBy: [SAFE_DRIVER]
};

const SAFE_DRIVER_CLAIM = {
  name: "Safe Driver Badge",
  displayName: "Safe Driver Badge",
  issuedBy: [SAFE_DRIVER],
  honoredBy: [CAR_LOAN]
};

const CAR_LOAN_CLAIM = {
  name: "Qualifies for Car Loan",
  displayName: "Qualifies for Car Loan",
  issuedBy: [CAR_LOAN],
  honoredBy: [CAR_DEALER]
};

const CAR_TITLE_CLAIM1 = {
  name: "Car Title Claim 1",
  displayName: "Car Title Claim 1",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const CAR_TITLE_CLAIM2 = {
  name: "Car Title Claim 2",
  displayName: "Car Title Claim 2",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const INSURANCE_CLAIM = {
  name: "Car Insurance",
  displayName: "Car Insurance",
  issuedBy: [INSURANCE],
  honoredBy: [RIDE_SHARING]
};

const DRIVER_VERIFICATION = {
  name: "Driver Verification",
  displayName: "Driver Verification",
  issuedBy: [RIDE_SHARING],
  honoredBy: [INVESTMENTS]
};

const INVESTMENTS_CLAIM = {
  name: "Ride Away Stock Purchase Plan",
  displayName: "Ride Away Stock Purchase Plan",
  issuedBy: [INVESTMENTS],
  honoredBy: []
};

// Attach claims to services
DRIVERS_LICENSE.generatedClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH];
DRIVERS_LICENSE.requiredClaims = DRIVERS_LICENSE.generatedClaims.map(c => ({
  ...c,
  issuedBy: [YOURSELF]
}));
SAFE_DRIVER.requiredClaims = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH];
SAFE_DRIVER.requiredServices = [DRIVERS_LICENSE];
SAFE_DRIVER.generatedClaims = [SAFE_DRIVER_CLAIM];
CAR_LOAN.requiredServices = [DRIVERS_LICENSE, SAFE_DRIVER];
CAR_LOAN.generatedClaims = [CAR_LOAN_CLAIM];
CAR_DEALER.requiredServices = [DRIVERS_LICENSE, CAR_LOAN];
CAR_DEALER.generatedClaims = [CAR_TITLE_CLAIM1, CAR_TITLE_CLAIM2];
INSURANCE.requiredServices = [DRIVERS_LICENSE, CAR_DEALER, SAFE_DRIVER];
INSURANCE.generatedClaims = [INSURANCE_CLAIM];
RIDE_SHARING.requiredServices = [DRIVERS_LICENSE, CAR_DEALER, INSURANCE, SAFE_DRIVER];
RIDE_SHARING.generatedClaims = [DRIVER_VERIFICATION];
INVESTMENTS.requiredServices = [DRIVERS_LICENSE, RIDE_SHARING, SAFE_DRIVER];
INVESTMENTS.generatedClaims = [INVESTMENTS_CLAIM]

export const SERVICES = {
  DRIVERS_LICENSE, SAFE_DRIVER, CAR_LOAN, CAR_DEALER, INSURANCE, RIDE_SHARING,
  INVESTMENTS
};

// Create route config for services
export const routes = Object.keys(SERVICES).map(serviceId => ({
  path: SERVICES[serviceId].url,
  serviceId
}));

// Ext Service URLs

const getChasquiUrl = () => process.env.REACT_APP_TARGET_ENV === "prod"
  ? "https://api.uport.me/chasqui/"
  : "https://api.uport.space/chasqui/";

export const CHASQUI_URL = getChasquiUrl();
export const SIGNER_URL = getSignerUrl();
export const SENTRY_DSN = "";
