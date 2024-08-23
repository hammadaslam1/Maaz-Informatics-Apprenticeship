import express from "express";
import { createBlog, getBlogs } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);

export default router;
