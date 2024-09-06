import express from "express";
import { loginUser, signupUser } from "../controllers/user.controller.js";
import { validateSignup } from "../validations/user.validation.js";

const router = express.Router();

router.post("/create", validateSignup, signupUser);
router.post("/getUser", loginUser);

export default router;
