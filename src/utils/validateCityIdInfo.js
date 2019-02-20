import dayjs from "dayjs";

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
      fieldId: "firstName",
      error: "First Name is required"
    };
  }
  if(!lastName) {
    return {
      valid: false,
      fieldId: "lastName",
      error: "Last Name is required"
    };
  }
  if(!address) {
    return {
      valid: false,
      fieldId: "address",
      error: "Address is required"
    };
  }
  if(!city) {
    return {
      valid: false,
      fieldId: "city",
      error: "City is required"
    };
  }
  if(!zipCode) {
    return {
      valid: false,
      fieldId: "zipCode",
      error: "Zip Code is required"
    };
  }
  if(!country) {
    return {
      valid: false,
      fieldId: "country",
      error: "Country is required"
    };
  }
  if(!dob) {
    return {
      valid: false,
      fieldId: "dob",
      error: "This field is required"
    };
  }
  const today = dayjs();
  if(!/^\d{4}\-\d{2}\-\d{2}$/.test(dob) ||
    !dayjs(dob).isValid() ||
    dayjs(dob).year() > today.year() - 13 ||
    dayjs(dob).year() < 1900
  ) {
    return {
      valid: false,
      fieldId: "dob",
      error: "Invalid date of birth"
    };
  }

  if(!toc) {
    return {
      valid: false,
      fieldId: "toc",
      error: "You must agree to the terms and conditions"
    };
  }

  return {
    valid: true
  };
};
