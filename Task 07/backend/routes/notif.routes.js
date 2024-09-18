import express from "express";
import { sendNotification } from "../controllers/notifications.controller.js";
import multer from "multer";

const upload = multer();

const router = express.Router();
router.use(upload.none());
router.post("/send", sendNotification);

export default router;
