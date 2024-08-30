import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createMail } from "../controllers/mail.controller.js";

const router = express.Router();

router.use(requireAuth);

router.post("/create", createMail);
 
export default router;
