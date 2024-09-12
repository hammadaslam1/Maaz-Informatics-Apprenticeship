import express from "express";
import {
  getUser,
  createUser,
  getUsersByID,
} from "../controllers/teacher.controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../validations/user.validation.js";
import { teacherAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", signupValidator, validate, createUser);
router.post("/getUser", loginValidator, validate, getUser);
router.use(teacherAuth);
// router.get("/getUsersById/:id", getUsersByID);

export default router;
