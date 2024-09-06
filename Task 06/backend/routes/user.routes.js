import express from "express";
import { loginUser, signupUser } from "../controllers/user.controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/create", signupValidator, validate, signupUser);
router.post("/getUser", loginValidator, validate, loginUser);

export default router;
