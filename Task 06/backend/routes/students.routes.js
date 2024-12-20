import express from "express";
import {
  getUser,
  createUser,
  getUsersByID,
  getFilesBySubject,
  getFilesByClass,
} from "../controllers/student.controller.js";
import {
  loginValidator,
  studentSignupValidator,
  validate,
} from "../validations/user.validation.js";
import multer from "multer";
import { studentAuth, teacherAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
const mltr = multer();

router.use(mltr.none());
router.post("/create", studentSignupValidator, validate, createUser);
router.post("/getUser", loginValidator, validate, getUser);
router.get("/getUsersById/:id", teacherAuth, getUsersByID);
router.use(studentAuth);
router.get("/getFilesBySubject/:class/:subject", getFilesBySubject);
router.get("/getFilesByClass/:class", getFilesByClass);

export default router;
