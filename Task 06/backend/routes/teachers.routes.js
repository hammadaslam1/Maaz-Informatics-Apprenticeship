import express from "express";
import {
  getUser,
  createUser,
  getUsersByID,
  assignmentUpload,
  getUsersByTeacherAndSubject,
} from "../controllers/teacher.controller.js";
import {
  loginValidator,
  teacherSignupValidator,
  validate,
} from "../validations/user.validation.js";
import { teacherAuth } from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const classes = req.body.class;
    const { subject, id } = req.body;
    const dir = path.join(
      "files",
      id,
      classes.toUpperCase(),
      subject.toUpperCase()
    );

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.post("/create", upload.none(), createUser);
router.post(
  "/create",
  upload.none(),
  teacherSignupValidator,
  validate,
  createUser
);
router.post("/getUser", upload.none(), loginValidator, validate, getUser);
router.use(teacherAuth);
router.post("/sendFiles", upload.single("file"), assignmentUpload);
router.get("/get-students/:id/:classes/:subject", getUsersByTeacherAndSubject);

export default router;
