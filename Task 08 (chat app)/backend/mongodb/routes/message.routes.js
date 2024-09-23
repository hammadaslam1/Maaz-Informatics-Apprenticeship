import express from "express";
import { getMessage, newMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send", newMessage);
router.get("/get/:id", getMessage);

export default router;
