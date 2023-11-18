const { body, validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const withValidatorErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      const errorArray = errors.array();
      if (!errors.isEmpty()) {
        const errorMessages = errorArray.map((error) => error.msg);
        const error = new Error(errorMessages);
        error.statusCode = StatusCodes.BAD_REQUEST;
        if (errorMessages[0].startsWith("no student")) {
          error.statusCode = StatusCodes.NOT_FOUND;
        }
        throw error;
      }
      next();
    },
  ];
};

exports.validateCompleteLogin = withValidatorErrors([
  body("nickName").notEmpty().withMessage("Nick Name is required"),

  body("gender").notEmpty().withMessage("Gender is required"),

  body("height").notEmpty().withMessage("Height is required"),

  body("weight").notEmpty().withMessage("Weight is required"),
]);
