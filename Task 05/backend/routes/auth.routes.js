import express from "express";
import { createAuth, loginAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/create", createAuth);
router.post("/login", loginAuth);

export default router;
