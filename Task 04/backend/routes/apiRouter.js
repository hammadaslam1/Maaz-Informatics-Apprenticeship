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
router.put("/put", putApi);
router.delete("/delete", deleteApi);

export default router;