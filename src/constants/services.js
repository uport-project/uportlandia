import CityIDIcon from "../images/city-logo.png";
import DiplomaIcon from "../images/university-logo.png";
import EmploymentIcon from "../images/company-logo.png";
import InsuranceIcon from "../images/insurance-logo.png";
import PharmacyIcon from "../images/pharmacy-logo.png";
import TransportIcon from "../images/transport-logo.png";
import MuseumIcon from "../images/museum-logo.png";

const CITY_ID = {
  name: "City ID",
  icon: CityIDIcon,
  entity: "The City of Cleverland",
  description: "Identify yourself with one click. Get a digital City ID. Enjoy quick, seamless, and often free access to many city services.",
  url: "/city"
};

const DIPLOMA = {
  name: "Diploma",
  icon: DiplomaIcon,
  entity: "The university of Cleverland",
  description: "Get a verified digital copy of your diploma. Share it easily at you next job interview or while applying to post graduate program.",
  url: "/university"
};

const COMPANY = {
  name: "Employment Verification",
  icon: EmploymentIcon,
  entity: "DREAM JOB LLC.",
  description: "Share confirmation of your employment easily. No more collecting stacks of documents to apply for a mortgage or sign a lease.",
  url: "/company"
};

const INSURANCE = {
  name: "Insurance Coverage",
  icon: InsuranceIcon,
  entity: "People Care Insurance LLC.",
  description: "Share your insurance information easily at your doctor’s office, pharmacy or at any emergency.",
  url: "/insurance"
};

const PHARMACY = {
  name: "Presciption Drug",
  icon: PharmacyIcon,
  entity: "Your Health Medical Center",
  description: "No more waiting for the doctor to call your pharmacy. Share your drug prescription at any drug store, any time.",
  url: "/pharmacy"
};

const TRANSPORT = {
  name: "Monthly Bus Ticket",
  icon: TransportIcon,
  entity: "Cleverland City Transit",
  description: "Are you a Cleverland citizen? Alumni of The Cleverland University? Get your montly bus ticket for free and enjoy the city trasportation!",
  url: "/transport"
};

const MUSEUM = {
  name: "Annual Membership",
  icon: MuseumIcon,
  entity: "Cleverland Museum of Modern Art",
  description: "Get a free membership with your City ID.",
  url: "/museum"
};

// Claims
const FIRST_NAME = {
  name: "First Name",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const LAST_NAME = {
  name: "Last Name",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const DATE_OF_BIRTH = {
  name: "Date of Birth",
  issuedBy: [CITY_ID],
  honoredBy: [DIPLOMA, INSURANCE, MUSEUM, TRANSPORT, PHARMACY]
};

const ADDRESS = {
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
  name: "Presciption Drug",
  issuedBy: [PHARMACY]
};

const BUS_TICKET = {
  name: "Monthly Bus Ticket",
  issuedBy: [TRANSPORT]
};

const MUSEUM_MEMBERSHIP = {
  name: "Annual Membership",
  issuedBy: [MUSEUM]
};

// Attach claims to services
CITY_ID.generatedClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH];
DIPLOMA.requiredClaims = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH];
DIPLOMA.generatedClaims = [SCHOOL_NAME, PROGRAM_NAME, GRADUATION_YEAR, FINAL_GRADES];
COMPANY.requiredClaims = [FIRST_NAME, LAST_NAME, SCHOOL_NAME, PROGRAM_NAME, FINAL_GRADES];
COMPANY.generatedClaims = [COMPANY_NAME, SALARY, DATE_OF_EMPLOYMENT];
INSURANCE.requiredClaims = [FIRST_NAME, LAST_NAME, COMPANY_NAME, DATE_OF_EMPLOYMENT];
INSURANCE.generatedClaims = [POLICY_NUMBER, GROUP_NUMBER, DEPENDENCIES];
PHARMACY.requiredClaims = [FIRST_NAME, LAST_NAME, POLICY_NUMBER, GRADUATION_YEAR, DEPENDENCIES];
PHARMACY.generatedClaims = [PRESCRIPTION_DRUG];
TRANSPORT.requiredClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH, GRADUATION_YEAR];
TRANSPORT.generatedClaims = [BUS_TICKET];
MUSEUM.requiredClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH]
MUSEUM.generatedClaims = [MUSEUM_MEMBERSHIP];

export default {
  CITY_ID, DIPLOMA, COMPANY, INSURANCE, PHARMACY, TRANSPORT, MUSEUM
}
