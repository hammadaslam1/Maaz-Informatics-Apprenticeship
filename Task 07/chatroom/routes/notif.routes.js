import express from "express";
import { sendNotification } from "../controllers/notifications.controller.js";
import multer from "multer";
import { userAuth } from "../middlewares/auth.middleware.js";

const upload = multer();

const router = express.Router();
router.use(upload.none());
router.use(userAuth);
router.post("/send", sendNotification);

export default router;
