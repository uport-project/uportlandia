function validateRequirements(service, profile) {
  const { requiredServices=[], requiredClaims=[] } = service;
  let isValid = true;
  if(requiredServices.length) {
    requiredServices.forEach(rq => {
      if(!profile[rq.claim]) {
        console.log(rq.claim)
        isValid = false;
      }
    });
    return isValid;
  }
  requiredClaims.forEach(rc => {
    if(!profile[rc.id]) {
      console.log(rc.id)
      isValid = false;
    }
  });
  return isValid;
}

export default validateRequirements;
