import { validationResult, body } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((data) => data.msg));
  } else {
    next();
  }
};

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("The email should not be empty.")
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password")
    .notEmpty()
    .withMessage("The password should not be empty.")
    .isLength({
      min: 6,
    })
    .withMessage("The minimum password length is 6 characters"),
];

export const signupValidator = [
  body("first_name")
    .notEmpty()
    .withMessage("The first name is should not be empty.")
    .isString()
    .withMessage("The first name should contain only string characters"),
  body("last_name")
    .notEmpty()
    .withMessage("The last name is should not be empty.")
    .isString()
    .withMessage("The last name should contain only string characters."),
  body("email")
    .notEmpty()
    .withMessage("The email should not be empty.")
    .isEmail()
    .withMessage("The email should be valid."),
  body("password")
    .notEmpty()
    .withMessage("The password should not be empty.")
    .isLength({ min: 6 })
    .withMessage("The minimum password length is 6 characters"),
  body("class")
    .notEmpty()
    .withMessage("The class should not be empty.")
    .isString()
    .withMessage("The class should contain only string characters"),
  body("role")
    .notEmpty()
    .withMessage("The class should not be empty.")
    .isString()
    .withMessage("The role should contain only string character."),
  body("subject")
    .notEmpty()
    .withMessage("The subject should not be empty.")
    .isArray()
    .withMessage("The subject should be in an array."),
];

export const teacherSignupValidator = [
  body("first_name")
    .notEmpty()
    .withMessage("The first name is should not be empty.")
    .isString()
    .withMessage("The first name should contain only string characters"),
  body("last_name")
    .notEmpty()
    .withMessage("The last name is should not be empty.")
    .isString()
    .withMessage("The last name should contain only string characters."),
  body("email")
    .notEmpty()
    .withMessage("The email should not be empty.")
    .isEmail()
    .withMessage("The email should be valid."),
  body("password")
    .notEmpty()
    .withMessage("The password should not be empty.")
    .isLength({ min: 6 })
    .withMessage("The minimum password length is 6 characters"),
  body("classes.*.class")
    .notEmpty()
    .withMessage("The class should not be empty.")
    .isString()
    .withMessage("The class should be a string."),
  body("classes.*.subject")
    .notEmpty()
    .withMessage("The subject should not be empty.")
    .isArray()
    .withMessage("The subject should be in an array."),
  body("role")
    .notEmpty()
    .withMessage("The role should not be empty.")
    .isString()
    .withMessage("The role should contain only string character."),
];
