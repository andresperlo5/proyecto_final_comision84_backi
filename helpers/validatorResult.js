const { validationResult } = require("express-validator");

const resultValidator = (req) => {
  const errors = validationResult(req);
  return errors;
};

module.exports = resultValidator;
