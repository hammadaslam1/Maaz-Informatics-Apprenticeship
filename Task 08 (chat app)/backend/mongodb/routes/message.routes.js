import express from "express";
import { getMessage, newMessage, setDelivered, setSeen } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send", newMessage);
router.get("/get/:id", getMessage);
router.post("/update-delivered", setDelivered)
router.post("/update-seen", setSeen)

export default router;
