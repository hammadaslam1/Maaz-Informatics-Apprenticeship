import express from "express";
import {
  getConversation,
  newConversation,
} from "../controllers/consversation.controller.js";

const router = express.Router();

router.post("/create", newConversation);
router.post("/get", getConversation);

export default router;
