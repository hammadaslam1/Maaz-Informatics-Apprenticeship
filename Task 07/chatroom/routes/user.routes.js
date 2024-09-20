import express from "express";
import {
  loginValidator,
  studentSignupValidator,
  validate,
} from "../middlewares/user.validator.js";
import multer from "multer";
import { createUser, getUser } from "../controllers/user.controller.js";

const router = express.Router();

const mltr = multer();

router.use(mltr.none());
router.post("/signup", studentSignupValidator, validate, createUser);
router.post("/login", loginValidator, validate, getUser);
 
export default router;
