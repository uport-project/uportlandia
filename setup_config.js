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
  url: "https://uportlandia.uport.space/city",
  profileImage: "src/images//city-logo.png"
}, {
  id: "DIPLOMA",
  name: "The University of uPortlandia",
  url: "https://uportlandia.uport.space/university",
  profileImage: "src/images//university-logo.png"
}, {
  id: "COMPANY",
  name: "Dream Job LLC.",
  url: "https://uportlandia.uport.space/company",
  profileImage: "src/images//company-logo.png"
}, {
  id: "INSURANCE",
  name: "People Care LLC.",
  url: "https://uportlandia.uport.space/insurance",
  profileImage: "src/images//insurance-logo.png"
}, {
  id: "PHARMACY",
  name: "Your Health Medical Center",
  url: "https://uportlandia.uport.space/pharmacy",
  profileImage: "src/images//pharmacy-logo.png"
}, {
  id: "TRANSPORT",
  name: "uPortlandia City Transit",
  url: "https://uportlandia.uport.space/transport",
  profileImage: "src/images//transport-logo.png"
}, {
  id: "MUSEUM",
  name: "uPortlandia Museum of Modern Art",
  url: "https://uportlandia.uport.space/museum",
  profileImage: "src/images//museum-logo.png"
}];
