export default (data={}) => {
  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    country,
    dob,
    toc
  } = data;
  if(!firstName) {
    return {
      valid: false,
      error: "First Name is required"
    };
  }
  if(!lastName) {
    return {
      valid: false,
      error: "Last Name is required"
    };
  }
  if(!address) {
    return {
      valid: false,
      error: "Address is required"
    };
  }
  if(!city) {
    return {
      valid: false,
      error: "City is required"
    };
  }
  if(!zipCode) {
    return {
      valid: false,
      error: "Zip Code is required"
    };
  }
  if(!country) {
    return {
      valid: false,
      error: "Country is required"
    };
  }
  if(!dob) {
    return {
      valid: false,
      error: "Date of birth is required"
    };
  }
  if(!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
    return {
      valid: false,
      error: "Invalid date of birth"
    };
  }

  if(!toc) {
    return {
      valid: false,
      error: "Required to agree to the terms and conditions"
    };
  }


};
