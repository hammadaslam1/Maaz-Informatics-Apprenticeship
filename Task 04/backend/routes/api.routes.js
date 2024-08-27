import express from "express";
import {
  deleteApi,
  getApi,
  postApi,
  putApi,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/get", getApi);
router.post("/post", postApi);
router.put("/put/:id", putApi);
router.delete("/delete/:id", deleteApi);

export default router;
