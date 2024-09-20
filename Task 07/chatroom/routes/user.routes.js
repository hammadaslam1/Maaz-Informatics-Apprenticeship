import express from "express";
import {
  loginValidator,
  studentSignupValidator,
  validate,
} from "../middlewares/user.validator.js";
import multer from "multer";
import { createUser, getUser } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

const mltr = multer();

router.use(mltr.none());
router.post("/signup", studentSignupValidator, validate, createUser);
router.post("/login", loginValidator, validate, getUser);
router.use(userAuth);

export default router;
