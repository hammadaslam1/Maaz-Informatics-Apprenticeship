import express from "express";
import {
  getUser,
  createUser,
  getUsersByID,
} from "../controllers/student.controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../validations/user.validation.js";
import { studentAuth, teacherAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create", signupValidator, validate, createUser);
router.post("/getUser", loginValidator, validate, getUser);
router.get("/getUsersById/:id", teacherAuth, getUsersByID);
router.use(studentAuth);

export default router;
