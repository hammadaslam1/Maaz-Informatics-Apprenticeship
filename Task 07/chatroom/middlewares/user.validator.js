import { validationResult, body } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);

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

export const studentSignupValidator = [
  body("name")
    .notEmpty()
    .withMessage("The name is should not be empty.")
    .isString()
    .withMessage("The name should contain only string characters"),
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
];
