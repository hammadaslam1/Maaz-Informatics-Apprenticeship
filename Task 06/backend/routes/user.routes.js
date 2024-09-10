import express from "express";
import {
  getUser,
  createUser,
  getUsersByID,
} from "../controllers/user.controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/create", signupValidator, validate, createUser);
router.post("/getUser", loginValidator, validate, getUser);
router.get("/getUsersById/:id", getUsersByID);

export default router;
