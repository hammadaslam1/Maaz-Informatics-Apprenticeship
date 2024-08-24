import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudents,
} from "../controllers/student.controller.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body)
    const { id } = req.body;
    const dir = path.join("images", id);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const { name } = req.body;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

router.post("/create-student", upload.single("image"), createStudent);
router.get("/get-students", getStudents);
router.delete("/delete-student/:id", deleteStudent);

export default router;
