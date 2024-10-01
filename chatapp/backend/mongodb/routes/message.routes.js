import express from "express";
import {
  getMessage,
  newMessage,
  setDelivered,
  setSeen,
  uploadFile,
} from "../controllers/message.controller.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { base64ToMulterMiddleware } from "../middlewares/file.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = path.join("files");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});

router.post("/send", newMessage);
router.post("/upload", upload.single("text"), uploadFile);
router.get("/get/:id", getMessage);
router.post("/update-delivered", setDelivered);
router.post("/update-seen", setSeen);
router.post(
  "/send-image",
//   (req, res, next) => console.log("send image"),
  base64ToMulterMiddleware,
  upload.single("file"),
  uploadFile
);

export default router;
