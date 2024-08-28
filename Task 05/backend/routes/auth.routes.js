import express from "express";
import { createAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/create", createAuth);

export default router;