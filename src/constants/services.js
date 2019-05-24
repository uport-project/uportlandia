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
  displayName: "cityIdDisplayName",
  icon: CityIDIcon,
  entity: "the city of uportlandia",
  description: "cityIdDescription",
  url: "/city",
  claim: "Uportlandia City ID",
  steps: [
    "cityIdStep1",
    "cityIdStep2",
    "cityIdStep3",
    "cityIdStep4"
  ]
};

const DIPLOMA = {
  id: "DIPLOMA",
  name: "Diploma",
  displayName: "diplomaDisplayName",
  icon: DiplomaIcon,
  entity: "the university of uportlandia",
  description: "diplomaDescription",
  url: "/university",
  claim: "Diploma",
  steps: [
    "diplomaStep1",
    "diplomaStep2",
    "diplomaStep3"
  ]
};

const COMPANY = {
  id: "COMPANY",
  name: "Employment Verification",
  displayName: "employmentDisplayName",
  icon: EmploymentIcon,
  entity: "Dream Job LLC",
  description: "employmentDescription",
  url: "/company",
  claim: "Employment",
  steps: [
    "employmentStep1",
    "employmentStep2",
    "employmentStep3"
  ]
};

const INSURANCE = {
  id: "INSURANCE",
  name: "Insurance Coverage",
  displayName: "insuranceDisplayName",
  icon: InsuranceIcon,
  entity: "People Care Insurance LLC",
  description: "insuranceDescription",
  url: "/insurance",
  claim: "Insurance",
  steps: [
    "insuranceStep1",
    "insuranceStep2",
    "insuranceStep3"
  ]
};

const PHARMACY = {
  id: "PHARMACY",
  name: "Prescription Drug",
  displayName: "pharmacyDisplayName",
  icon: PharmacyIcon,
  entity: "Your Health Medical Center",
  description: "pharmacyDescription",
  url: "/pharmacy",
  claim: "Prescription Drug",
  steps: [
    "pharmacyStep1",
    "pharmacyStep2",
    "pharmacyStep3"
  ]
};

const TRANSPORT = {
  id: "TRANSPORT",
  name: "Monthly Bus Ticket",
  displayName: "transportDisplayName",
  icon: TransportIcon,
  entity: "uPortlandia City Transit",
  description: "transportDescription",
  url: "/transport",
  claim: "Bus Ticket",
  steps: [
    "transportStep1",
    "transportStep2",
    "transportStep3"
  ]
};

const MUSEUM = {
  id: "MUSEUM",
  name: "Annual Membership",
  displayName: "museumDisplayName",
  icon: MuseumIcon,
  entity: "uPortlandia Museum of Modern Art",
  description: "museumDescription",
  url: "/museum",
  claim: "Museum Membership",
  steps: [
    "museumStep1",
    "museumStep2",
    "museumStep3"
  ]
};

const YOURSELF = {
  id: "YOURSELF",
  name: "Yourself, Any Issuer",
  displayName: "Yourself, Any Issuer",
  icon: CityIDIcon,
  entity: "Yourself, Any Issuer",
  description: "Yourself, Any Issuer",
  url: "/"
};

// Claims
const FIRST_NAME = {
  id: "firstName",
  name: "First Name",
  displayName: "First Name",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const LAST_NAME = {
  id: "lastName",
  name: "Last Name",
  displayName: "Last Name",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const DATE_OF_BIRTH = {
  id: "dob",
  name: "Date of Birth",
  displayName: "Date of Birth",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const ADDRESS = {
  id: "address",
  name: "Address",
  displayName: "Address",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const SCHOOL_NAME = {
  name: "School Name",
  displayName: "School Name",
  issuedBy: [DIPLOMA],
  honoredBy: [COMPANY]
};

const PROGRAM_NAME = {
  name: "Program Name",
  displayName: "Program Name",
  type: "required",
  issuedBy: [DIPLOMA],
  honoredBy: [COMPANY]
};

const FINAL_GRADES = {
  name: "Final Grades",
  displayName: "Final Grades",
  issuedBy: [DIPLOMA],
  honoredBy: [COMPANY]
};

const GRADUATION_YEAR = {
  name: "Graduation Year",
  displayName: "Graduation Year",
  issuedBy: [DIPLOMA],
  honoredBy: [INSURANCE, COMPANY]
};

const COMPANY_NAME = {
  name: "Company Name",
  displayName: "Company Name",
  issuedBy: [COMPANY],
  honoredBy: [INSURANCE]
};

const SALARY = {
  name: "Salary",
  displayName: "Salary",
  issuedBy: [COMPANY]
};

const DATE_OF_EMPLOYMENT = {
  name: "Date of Employment",
  displayName: "Date of Employment",
  issuedBy: [COMPANY],
  honoredBy: [INSURANCE]
};

const POLICY_NUMBER = {
  name: "Policy Number",
  displayName: "Policy Number",
  issuedBy: [INSURANCE],
  honoredBy: [PHARMACY]
};

const GROUP_NUMBER = {
  name: "Group Number",
  displayName: "Group Number",
  issuedBy: [INSURANCE],
  honoredBy: [PHARMACY]
};

const DEPENDENCIES = {
  name: "Dependencies",
  displayName: "Dependencies",
  issuedBy: [INSURANCE],
  honoredBy: [PHARMACY]
};

const PRESCRIPTION_DRUG = {
  name: "Prescription Drug",
  displayName: "pharmacyDisplayName",
  issuedBy: [PHARMACY],
  honoredBy: [PHARMACY]
};

const BUS_TICKET = {
  name: "Monthly Bus Ticket",
  displayName: "transportDisplayName",
  issuedBy: [TRANSPORT],
  honoredBy: [TRANSPORT]
};

const MUSEUM_MEMBERSHIP = {
  name: "Annual Membership",
  displayName: "museumDisplayName",
  issuedBy: [MUSEUM],
  honoredBy: [MUSEUM]
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
