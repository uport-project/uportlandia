import { registration } from "../constants/config";

export default (data={}) => {
  let result = {
    valid: true
  };
  Object.keys(registration.form).forEach(fieldId => {
    if(!result.valid)
      return;
    if(typeof(registration.form[fieldId].isValid) === "function")
      result = registration.form[fieldId].isValid.call(null, data[fieldId])
    else if(registration.form[fieldId].required) {
      result = Boolean(data[fieldId])
        ? { valid: true }
        : {
          fieldId,
          valid: false,
          error: registration.form[fieldId].validationError ||
            `${registration.form[fieldId].label} is required`
        }
    }
  });
  return result;
};
