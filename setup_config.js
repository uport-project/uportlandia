module.exports.config = {
  region: "us-east-1",
  serviceName: "serto-ecosystems",
  ssmParam:{
    issuers: "/serto-ecosystems/${opt:stage}/issuers"
  },
  s3Bucket: {
    stage: "serto-ecosystems-stage",
    prod: "serto-ecosystems-prod"
  },
  domain: {
    stage: "ecosystems.uport.space",
    prod: "ecosystems.uport.me"
  },
  cors: true
};

module.exports.ISSUER_PROFILES = [{
  id: "DRIVERS_LICENSE",
  name: "Vericheck Identity Verifier",
  url: {
    stage: "https://ecosystems.uport.space/drivers_license",
    prod: "https://ecosystems.uport.me/drivers_license"
  },
  profileImage: "src/images/drivers-license-logo.png"
}, {
  id: "SAFE_DRIVER",
  name: "Mappe Maps & Navigation",
  url: {
    stage: "https://ecosystems.uport.space/safe_driver",
    prod: "https://ecosystems.uport.me/safe_driver"
  },
  profileImage: "src/images/safe-driver-logo.png"
}, {
  id: "CAR_LOAN",
  name: "Simple Fund Bank",
  url: {
    stage: "https://ecosystems.uport.space/car_loan",
    prod: "https://ecosystems.uport.me/car_loan"
  },
  profileImage: "src/images/car-loan-logo.png"
}, {
  id: "CAR_DEALER",
  name: "McQuinn Car Dealership",
  url: {
    stage: "https://ecosystems.uport.space/car_dealer",
    prod: "https://ecosystems.uport.me/car_dealer"
  },
  profileImage: "src/images/car-dealer-logo.png"
}, {
  id: "INSURANCE",
  name: "Better Safe Insurance Company",
  url: {
    stage: "https://ecosystems.uport.space/insurance",
    prod: "https://ecosystems.uport.me/insurance"
  },
  profileImage: "src/images/insurance-logo.png"
}, {
  id: "RIDE_SHARING",
  name: "Ride Away Ride-Sharing App",
  url: {
    stage: "https://ecosystems.uport.space/ride_sharing",
    prod: "https://ecosystems.uport.me/ride_sharing"
  },
  profileImage: "src/images/ride-sharing-logo.png"
}, {
  id: "INVESTMENTS",
  name: "Globe Capital Investments",
  url: {
    stage: "https://ecosystems.uport.space/investments",
    prod: "https://ecosystems.uport.me/investments"
  },
  profileImage: "src/images/investments-logo.png"
}];
