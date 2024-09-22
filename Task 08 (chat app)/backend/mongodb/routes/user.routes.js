import express from "express";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../middlewares/auth.validation.js";
import { login, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", signupValidator, validate, register);
router.post("/login", loginValidator, validate, login);

export default router;