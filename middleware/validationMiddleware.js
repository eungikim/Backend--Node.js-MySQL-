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

exports.validateAdminLogin = withValidatorErrors([
  body("email").notEmpty().isEmail().withMessage("a valid email is required"),

  body("password").notEmpty().withMessage("password is required"),
]);

exports.validateCompleteLogin = withValidatorErrors([
  body("nickName").notEmpty().withMessage("Nick Name is required"),

  body("gender").notEmpty().withMessage("Gender is required"),

  body("height").notEmpty().withMessage("Height is required"),

  body("weight").notEmpty().withMessage("Weight is required"),
]);

exports.validateExerciseAdding = withValidatorErrors([
  body("name").notEmpty().withMessage("name is required"),

  // body("duration").notEmpty().withMessage("duration is required"),

  body("pose_and_description")
    .notEmpty()
    .withMessage("pose_and_description is required"),

  body("precaution").notEmpty().withMessage("precaution is required"),
  body("method_of_performing")
    .notEmpty()
    .withMessage("method_of_performing is required"),
]);

exports.validateSendingReport = withValidatorErrors([
  // body("point_Achieved").notEmpty().withMessage("point_Achieved Is required"),

  body("performance").notEmpty().withMessage("performance is required"),

  // body("duration").notEmpty().withMessage("duration  is required"),

  body("totalWeight").notEmpty().withMessage("totalWeight is required"),

  body("totalCalories").notEmpty().withMessage("totalCalories  is required"),

  body("exerciseTime").notEmpty().withMessage("exerciseTime is required"),
]);

exports.validateMissionAdding = withValidatorErrors([
  body("title").notEmpty().withMessage("title is Required"),

  body("subTitle").notEmpty().withMessage("subTitle is required"),

  body("detailed_information")
    .notEmpty()
    .withMessage("detailed_information is required"),

  body("imageURL").notEmpty().withMessage("imageURL is required"),

  body("point").notEmpty().withMessage("point is required"),

  body("missionTheme").notEmpty().withMessage("missionTheme is required"),

  body("targetValue").notEmpty().withMessage("targetValue is required"),

  body("missionTheme").notEmpty().withMessage("missionTheme is required"),
]);

exports.validateNoticeAdding = withValidatorErrors([
  body("title").notEmpty().withMessage("title is Required"),

  body("thumbnailURL").notEmpty().withMessage("thumbnailURL is required"),
]);
