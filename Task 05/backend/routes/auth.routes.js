import express from "express";
import {
  createAuth,
  loginAuth,
  logoutAuth,
} from "../controllers/auth.controller.js";
import { requireAuth as authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", createAuth);
router.post("/login", loginAuth);
router.use(authMiddleware);

router.get("/check", (req, res) => {
  res.status(200).json({ message: "OK" });
});
router.post("/logout", logoutAuth);

export default router;
