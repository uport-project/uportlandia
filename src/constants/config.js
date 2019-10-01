import dayjs from "dayjs";

// Logos
import logo from "../images/serto-black-horiz.svg";
import DriversLicenseIcon from "../images/drivers-license-logo.png";
import SafeDriverIcon from "../images/safe-driver-logo.png";
import CarLoanIcon from "../images/car-loan-logo.png";
import CarDealerIcon from "../images/car-dealer-logo.png";
import InsuranceIcon from "../images/insurance-logo.png";
import RideSharingIcon from "../images/ride-sharing-logo.png";
import InvestmentsIcon from "../images/investments-logo.png";
// Good news icon
import SafeDriverGoodIcon from "../images/smiley-face-safe_driver.png";
import CarLoanGoodIcon from "../images/smiley-face-car_loan.png";
import CarDealerGoodIcon from "../images/smiley-face-car_dealer.png";
import InsuranceGoodIcon from "../images/smiley-face-insurance.png";
import RideSharingGoodIcon from "../images/smiley-face-ride_sharing.png";
import InvestmentsGoodIcon from "../images/smiley-face-investments.png";
// Success image
import DriversLicenseSuccessIcon from "../images/congratulations-drivers_license.png";
import SafeDriverSuccessIcon from "../images/congratulations-safe_driver.png";
import CarLoanSuccessIcon from "../images/congratulations-car_loan.png";
import CarDealerSuccessIcon from "../images/congratulations-car_dealer.png";
import InsuranceSuccessIcon from "../images/congratulations-insurance.png";
import RideSharingSuccessIcon from "../images/congratulations-ride_sharing.png";
import InvestmentsSuccessIcon from "../images/congratulations-investments.png";

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
  name: "Driver's License",
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
  successIcon: DriversLicenseSuccessIcon,
  entity: "Vericheck Identity Verifier",
  description: "driversLicenseDescription",
  url: "/drivers_license",
  claim: "Driver's License",
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
  goodNewsIcon: SafeDriverGoodIcon,
  successIcon: SafeDriverSuccessIcon,
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
    "Number of Accidents": 0,
    "Number of Speeding Violations": 0
  }
};

const CAR_LOAN = {
  id: "CAR_LOAN",
  name: "Simple Fund Bank",
  displayName: "carLoanDisplayName",
  icon: CarLoanIcon,
  goodNewsIcon: CarLoanGoodIcon,
  successIcon: CarLoanSuccessIcon,
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
    "Finance up to": "$50000",
    "Annual Percentage Rate": "8.45% - 23.28%",
    "Valid Through": dayjs().add(1, "year").format("MM/DD/YYYY")
  }
};

const CAR_DEALER = {
  id: "CAR_DEALER",
  name: "Car Title",
  displayName: "carDealerDisplayName",
  icon: CarDealerIcon,
  goodNewsIcon: CarDealerGoodIcon,
  successIcon: CarDealerSuccessIcon,
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
    "Vehicle ID number": "ABCD123",
    "Year": 2019,
    "Make": "Toyota",
    "Model": "Prius",
    "Plate Number": "NYC1212",
    "Owner": "Monica Smith"
  }
};

const INSURANCE = {
  id: "INSURANCE",
  name: "Car Insurance",
  displayName: "insuranceDisplayName",
  icon: InsuranceIcon,
  goodNewsIcon: InsuranceGoodIcon,
  successIcon: InsuranceSuccessIcon,
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
    "Policy Number": "123-1234-1234-123",
    "Status": "Effective"
  }
};

const RIDE_SHARING = {
  id: "RIDE_SHARING",
  name: "Driver Verification",
  displayName: "rideSharingDisplayName",
  icon: RideSharingIcon,
  goodNewsIcon: RideSharingGoodIcon,
  successIcon: RideSharingSuccessIcon,
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
    "Account Name": "monica123",
    "Date Joined": dayjs().format("MM/DD/YYYY")
  }
};

const INVESTMENTS = {
  id: "INVESTMENTS",
  name: "Ride Away Stock Purchase Plan",
  displayName: "investmentsDisplayName",
  icon: InvestmentsIcon,
  goodNewsIcon: InvestmentsGoodIcon,
  successIcon: InvestmentsSuccessIcon,
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
    "Stock Price": "$10",
    "Purchase Price": "$8.50",
    "Contribution Level Guaranteed": "$8500.00"
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

// --------------------------------
// Claims
// --------------------------------
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

const NUM_ACC = {
  name: "Number of Accidents",
  displayName: "Number of Accidents",
  issuedBy: [SAFE_DRIVER],
  honoredBy: [CAR_LOAN]
};

const NUM_SPEED = {
  name: "Number of Speeding Violations",
  displayName: "Number of Speeding Violations",
  issuedBy: [SAFE_DRIVER],
  honoredBy: [CAR_LOAN]
};

const FINANCE_UP_TO = {
  name: "Finance up to",
  displayName: "Finance up to",
  issuedBy: [CAR_LOAN],
  honoredBy: [CAR_DEALER]
};

const ANNUAL_RATE = {
  name: "Annual Percentage Rate",
  displayName: "Annual Percentage Rate",
  issuedBy: [CAR_LOAN],
  honoredBy: [CAR_DEALER]
};

const VALID_THRU = {
  name: "Valid Through",
  displayName: "Valid Through",
  issuedBy: [CAR_LOAN],
  honoredBy: [CAR_DEALER]
};

const VEH_ID = {
  name: "Vehicle ID Number",
  displayName: "Vehicle ID Number",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const VEH_YEAR = {
  name: "Year",
  displayName: "Year",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const VEH_MAKE = {
  name: "Vehicle Make",
  displayName: "Vehicle Make",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const VEH_MODEL = {
  name: "Vehicle Model",
  displayName: "Vehicle Model",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const VEH_PLATE = {
  name: "Plate Number",
  displayName: "Plate Number",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const VEH_OWNER = {
  name: "Owner",
  displayName: "Owner",
  issuedBy: [CAR_DEALER],
  honoredBy: [INSURANCE]
};

const POLICY_NUM = {
  name: "Policy Number",
  displayName: "Policy Number",
  issuedBy: [INSURANCE],
  honoredBy: [RIDE_SHARING]
};

const INSURANCE_STATUS = {
  name: "Status",
  displayName: "Status",
  issuedBy: [INSURANCE],
  honoredBy: [RIDE_SHARING]
};

const DRIVER_ACC = {
  name: "Account Name",
  displayName: "Account Name",
  issuedBy: [RIDE_SHARING],
  honoredBy: [INVESTMENTS]
};

const DRIVER_DOJ = {
  name: "Date Joined",
  displayName: "Date Joined",
  issuedBy: [RIDE_SHARING],
  honoredBy: [INVESTMENTS]
};

const STOCK_PRICE = {
  name: "Stock Price",
  displayName: "Stock Price",
  issuedBy: [INVESTMENTS],
  honoredBy: []
};

const PURCHASE_PRICE = {
  name: "Purchase Price",
  displayName: "Purchase Price",
  issuedBy: [INVESTMENTS],
  honoredBy: []
};

const CONTRIB_LEVEL = {
  name: "Contribution Level Guaranteed",
  displayName: "Contribution Level Guaranteed",
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
SAFE_DRIVER.generatedClaims = [NUM_ACC, NUM_SPEED];
CAR_LOAN.requiredServices = [DRIVERS_LICENSE, SAFE_DRIVER];
CAR_LOAN.generatedClaims = [FINANCE_UP_TO, ANNUAL_RATE, VALID_THRU];
CAR_DEALER.requiredServices = [DRIVERS_LICENSE, CAR_LOAN];
CAR_DEALER.generatedClaims = [VEH_ID, VEH_YEAR, VEH_MAKE, VEH_MODEL, VEH_PLATE, VEH_OWNER];
INSURANCE.requiredServices = [DRIVERS_LICENSE, CAR_DEALER, SAFE_DRIVER];
INSURANCE.generatedClaims = [POLICY_NUM, INSURANCE_STATUS];
RIDE_SHARING.requiredServices = [DRIVERS_LICENSE, CAR_DEALER, INSURANCE, SAFE_DRIVER];
RIDE_SHARING.generatedClaims = [DRIVER_ACC, DRIVER_DOJ];
INVESTMENTS.requiredServices = [DRIVERS_LICENSE, RIDE_SHARING, SAFE_DRIVER];
INVESTMENTS.generatedClaims = [STOCK_PRICE, PURCHASE_PRICE, CONTRIB_LEVEL]

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
