import CityIDIcon from "../images/city-logo.png";
import DiplomaIcon from "../images/university-logo.png";
import EmploymentIcon from "../images/company-logo.png";
import InsuranceIcon from "../images/insurance-logo.png";
import PharmacyIcon from "../images/pharmacy-logo.png";
import TransportIcon from "../images/transport-logo.png";
import MuseumIcon from "../images/museum-logo.png";

const CITY_ID = {
  id: "CITY_ID",
  name: "City ID",
  icon: CityIDIcon,
  entity: "The City of uPortlandia",
  description: "Identify yourself with one click. Get a digital City ID. Enjoy quick, seamless, and often free access to many city services.",
  url: "/city",
  claim: "Uportlandia City ID",
  steps: [
    "Login with uPort",
    "Enter your information",
    "Get verified",
    "Receive City ID"
  ]
};

const DIPLOMA = {
  id: "DIPLOMA",
  name: "Diploma",
  icon: DiplomaIcon,
  entity: "The University of uPortlandia",
  description: "Get a verified digital copy of your diploma. Share it easily at you next job interview or while applying to post graduate program.",
  url: "/university",
  claim: "Diploma",
  steps: [
    "Login with uPort",
    "Get verified",
    "Receive Diploma"
  ]
};

const COMPANY = {
  id: "COMPANY",
  name: "Employment Verification",
  icon: EmploymentIcon,
  entity: "Dream Job LLC.",
  description: "Share confirmation of your employment easily. No more collecting stacks of documents to apply for a mortgage or sign a lease.",
  url: "/company",
  claim: "Employment",
  steps: [
    "Login with uPort",
    "Get verified",
    "Receive Employment Verification"
  ]
};

const INSURANCE = {
  id: "INSURANCE",
  name: "Insurance Coverage",
  icon: InsuranceIcon,
  entity: "People Care Insurance LLC.",
  description: "Share your insurance information easily at your doctor’s office, pharmacy or at any emergency.",
  url: "/insurance",
  claim: "Insurance",
  steps: [
    "Login with uPort",
    "Get verified",
    "Receive Insurance Coverage"
  ]
};

const PHARMACY = {
  id: "PHARMACY",
  name: "Prescription Drug",
  icon: PharmacyIcon,
  entity: "Your Health Medical Center",
  description: "No more waiting for the doctor to call your pharmacy. Share your drug prescription at any drug store, any time.",
  url: "/pharmacy",
  claim: "Prescription Drug",
  steps: [
    "Login with uPort",
    "Get verified",
    "Receive Prescription Drug"
  ]
};

const TRANSPORT = {
  id: "TRANSPORT",
  name: "Monthly Bus Ticket",
  icon: TransportIcon,
  entity: "uPortlandia City Transit",
  description: "Are you a uPortlandia citizen? Alumni of The uPortlandia University? Get your montly bus ticket for free and enjoy the city trasportation!",
  url: "/transport",
  claim: "Bus Ticket",
  steps: [
    "Login with uPort",
    "Get verified",
    "Receive Bus Ticket"
  ]
};

const MUSEUM = {
  id: "MUSEUM",
  name: "Annual Membership",
  icon: MuseumIcon,
  entity: "uPortlandia Museum of Modern Art",
  description: "Get a free membership with your City ID.",
  url: "/museum",
  claim: "Museum Membership",
  steps: [
    "Login with uPort",
    "Get verified",
    "Receive Membership"
  ]
};

const YOURSELF = {
  id: "YOURSELF",
  name: "Yourself, Any Issuer",
  icon: CityIDIcon,
  entity: "Yourself, Any Issuer",
  description: "Yourself, Any Issuer",
  url: "/"
};

// Claims
const FIRST_NAME = {
  id: "firstName",
  name: "First Name",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const LAST_NAME = {
  id: "lastName",
  name: "Last Name",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const DATE_OF_BIRTH = {
  id: "dob",
  name: "Date of Birth",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const ADDRESS = {
  id: "address",
  name: "Address",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const SCHOOL_NAME = {
  name: "School Name",
  issuedBy: [DIPLOMA],
  honoredBy: [COMPANY]
};

const PROGRAM_NAME = {
  name: "Program Name",
  type: "required",
  issuedBy: [DIPLOMA],
  honoredBy: [COMPANY]
};

const FINAL_GRADES = {
  name: "Final Grades",
  issuedBy: [DIPLOMA],
  honoredBy: [COMPANY]
};

const GRADUATION_YEAR = {
  name: "Graduation Year",
  issuedBy: [DIPLOMA],
  honoredBy: [INSURANCE, COMPANY]
};

const COMPANY_NAME = {
  name: "Company Name",
  issuedBy: [COMPANY],
  honoredBy: [INSURANCE]
};

const ROLE = {
  name: "Role",
  issuedBy: [COMPANY]
};

const SALARY = {
  name: "Salary",
  issuedBy: [COMPANY]
};

const DATE_OF_EMPLOYMENT = {
  name: "Date of Employment",
  issuedBy: [COMPANY],
  honoredBy: [INSURANCE]
};

const POLICY_NUMBER = {
  name: "Policy Number",
  issuedBy: [INSURANCE],
  honoredBy: [PHARMACY]
};

const GROUP_NUMBER = {
  name: "Group Number",
  issuedBy: [INSURANCE],
  honoredBy: [PHARMACY]
};

const DEPENDENCIES = {
  name: "Dependencies",
  issuedBy: [INSURANCE],
  honoredBy: [PHARMACY]
};

const PRESCRIPTION_DRUG = {
  name: "Prescription Drug",
  issuedBy: [PHARMACY],
  honoredBy: [PHARMACY]
};

const BUS_TICKET = {
  name: "Monthly Bus Ticket",
  issuedBy: [TRANSPORT],
  honoredBy: [TRANSPORT]
};

const MUSEUM_MEMBERSHIP = {
  name: "Annual Membership",
  issuedBy: [MUSEUM],
  honoredBy: [TRANSPORT]
};

// Attach claims to services
CITY_ID.generatedClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH];
CITY_ID.requiredClaims = CITY_ID.generatedClaims.map(c => ({
  ...c,
  issuedBy: [YOURSELF]
}));
DIPLOMA.requiredClaims = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH];
DIPLOMA.requiredServices = [CITY_ID];
DIPLOMA.generatedClaims = [SCHOOL_NAME, PROGRAM_NAME, GRADUATION_YEAR, FINAL_GRADES];
COMPANY.requiredClaims = [FIRST_NAME, LAST_NAME, SCHOOL_NAME, PROGRAM_NAME, FINAL_GRADES];
COMPANY.requiredServices = [CITY_ID, DIPLOMA];
COMPANY.generatedClaims = [COMPANY_NAME, SALARY, DATE_OF_EMPLOYMENT];
INSURANCE.requiredClaims = [FIRST_NAME, LAST_NAME, COMPANY_NAME, DATE_OF_EMPLOYMENT];
INSURANCE.requiredServices = [CITY_ID, COMPANY];
INSURANCE.generatedClaims = [POLICY_NUMBER, GROUP_NUMBER, DEPENDENCIES];
PHARMACY.requiredClaims = [FIRST_NAME, LAST_NAME, POLICY_NUMBER, GRADUATION_YEAR, DEPENDENCIES];
PHARMACY.requiredServices = [CITY_ID, INSURANCE, DIPLOMA];
PHARMACY.generatedClaims = [PRESCRIPTION_DRUG];
TRANSPORT.requiredClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH, GRADUATION_YEAR];
TRANSPORT.requiredServices = [CITY_ID, DIPLOMA];
TRANSPORT.generatedClaims = [BUS_TICKET];
MUSEUM.requiredClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH]
MUSEUM.requiredServices = [CITY_ID];
MUSEUM.generatedClaims = [MUSEUM_MEMBERSHIP];

export default {
  CITY_ID, DIPLOMA, COMPANY, INSURANCE, PHARMACY, TRANSPORT, MUSEUM
}
