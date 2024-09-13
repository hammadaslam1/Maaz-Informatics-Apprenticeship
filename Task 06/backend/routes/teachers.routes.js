import express from "express";
import {
  getUser,
  createUser,
  getUsersByID,
  fileUpload,
} from "../controllers/teacher.controller.js";
import {
  loginValidator,
  signupValidator,
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
    const { subject } = req.body;
    const dir = path.join(
      "files",
      classes.toUpperCase(),
      subject.toUpperCase()
    );

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      req.body.class.toUpperCase() +
        "_" +
        req.body.subject.toUpperCase() +
        "_" +
        req.body.name.toUpperCase() +
        path.extname(file.originalname)
    );
  },
});
const mltr = multer();
router.use(mltr.none());
router.post("/create", signupValidator, validate, createUser);
router.post("/getUser", loginValidator, validate, getUser);
router.use(teacherAuth);
// router.get("/getUsersById/:id", getUsersByID);
const upload = multer({ storage: storage });
router.post("/sendFiles", upload.single("file"), fileUpload);

export default router;
