import { validationResult, body } from "express-validator";

// export const validateSignup = (req, res, next) => {
//   console.log(req.body);

//   const { my_email, my_password, first_name, last_name, my_class } = req.body;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   try {
//     if (
//       !my_email ||
//       !my_password ||
//       !first_name ||
//       !last_name ||
//       !my_class ||
//       my_email === "" ||
//       my_password === "" ||
//       first_name === "" ||
//       last_name === "" ||
//       my_class === ""
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Please fill all the required fields." });
//     } else if (typeof first_name !== "string") {
//       res.status(400).json({
//         message: `String is required in the first name field but got ${typeof first_name}`,
//       });
//     } else if (typeof last_name !== "string") {
//       res.status(400).json({
//         message: `String is required in the last name field but got ${typeof last_name}`,
//       });
//     } else if (typeof my_email !== "string") {
//       res.status(400).json({
//         message: `String is required in the email field but got ${typeof my_email}`,
//       });
//     } else if (typeof my_password !== "string") {
//       res.status(400).json({
//         message: `String is required in the password field but got ${typeof my_password}`,
//       });
//     } else if (typeof my_class !== "string") {
//       res.status(400).json({
//         message: `String is required in the class field but got ${typeof my_class}`,
//       });
//     } else {
//       if (!emailRegex.test(my_email)) {
//         res.status(400).json({ message: "Invalid email format." });
//       } else if (my_password.length < 6) {
//         res
//           .status(400)
//           .json({ message: "Password must be at least 6 characters long." });
//       } else {
//         console.log("validation complete");

//         next();
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((data) => data.msg));
  } else {
    next();
  }
};

export const loginValidator = [
  body("email", "The email should be valid.").not().isEmpty().isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

export const signupValidator = [
  body(
    "first_name",
    "The first name should not be empty and contain only string characters"
  )
    .not()
    .isEmpty()
    .isString(),
  body(
    "last_name",
    "The last name should not be empty and contain only string characters"
  )
    .not()
    .isEmpty()
    .isString(),
  body("email", "The email should be valid.").not().isEmpty().isEmail(),
  body("password", "The minimum password length is 6 characters")
    .not()
    .isEmpty()
    .isLength({
      min: 6,
    }),
  body(
    "class",
    "The class should not be empty and contain only string characters"
  )
    .not()
    .isEmpty()
    .isString(),
  body("role", "The role should be student or teacher.")
    .not()
    .isEmpty()
    .isString(),
  body("subject", "The subjects should be in an array.").not().isEmpty().isArray(),
];
