import express from "express";
import { checkServerIp } from "../controllers/server.controller.js";

const router = express.Router();

router.get("/checkserverip", checkServerIp);

export default router;