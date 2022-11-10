const requiredFieldsCheck = (requestBody, requiredFields) => {
  return requiredFields.filter((key) => !requestBody.hasOwnProperty(key));
};

module.exports = {
  requiredFieldsCheck,
};
