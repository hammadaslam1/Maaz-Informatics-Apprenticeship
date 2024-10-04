import express from "express";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../middlewares/auth.validation.js";
import {
  getAllUsers,
  getUser,
  login,
  register,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", signupValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/getallusers", getAllUsers);
router.get("/getuser/:id", getUser)

export default router;
