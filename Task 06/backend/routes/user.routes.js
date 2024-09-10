import express from "express";
import { getUser, createUser } from "../controllers/user.controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/create", signupValidator, validate, createUser);
router.post("/getUser", loginValidator, validate, getUser);

export default router;
