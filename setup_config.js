module.exports.config = {
  region: "us-east-1",
  serviceName: "uportlandia",
  ssmParam:{
    issuers: "/uportlandia/${opt:stage}/issuers"
  },
  s3Bucket: {
    stage: "cleverland-stage",
    prod: "cleverland-prod"
  },
  domain: {
    stage: "uportlandia.uport.space",
    prod: "uportlandia.uport.me"
  },
  cors: true
};

module.exports.ISSUER_PROFILES = [{
  id: "CITY_ID",
  name: "The City of uPortlandia",
  url: {
    stage: "https://uportlandia.uport.space/city",
    prod: "https://uportlandia.uport.me/city"
  },
  profileImage: "src/images/city-logo.png"
}, {
  id: "DIPLOMA",
  name: "The University of uPortlandia",
  url: {
    stage: "https://uportlandia.uport.space/university",
    prod: "https://uportlandia.uport.me/university"
  },
  profileImage: "src/images/university-logo.png"
}, {
  id: "COMPANY",
  name: "Dream Job LLC.",
  url: {
    stage: "https://uportlandia.uport.space/company",
    prod: "https://uportlandia.uport.me/company"
  },
  profileImage: "src/images/company-logo.png"
}, {
  id: "INSURANCE",
  name: "People Care LLC.",
  url: {
    stage: "https://uportlandia.uport.space/insurance",
    prod: "https://uportlandia.uport.me/insurance"
  },
  profileImage: "src/images/insurance-logo.png"
}, {
  id: "PHARMACY",
  name: "Your Health Medical Center",
  url: {
    stage: "https://uportlandia.uport.space/pharmacy",
    prod: "https://uportlandia.uport.me/pharmacy"
  },
  profileImage: "src/images/pharmacy-logo.png"
}, {
  id: "TRANSPORT",
  name: "uPortlandia City Transit",
  url: {
    stage: "https://uportlandia.uport.space/transport",
    prod: "https://uportlandia.uport.me/transport"
  },
  profileImage: "src/images/transport-logo.png"
}, {
  id: "MUSEUM",
  name: "uPortlandia Museum of Modern Art",
  url: {
    stage: "https://uportlandia.uport.space/museum",
    prod: "https://uportlandia.uport.me/museum"
  },
  profileImage: "src/images/museum-logo.png"
}];
