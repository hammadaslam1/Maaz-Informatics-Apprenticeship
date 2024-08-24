import express from "express";
import {
  createAddress,
  getAddressesByID,
  getAddressesByStudentID,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/create-address", createAddress);
router.get("/get-address-by-student-id/:studentID", getAddressesByStudentID);
router.get("/get-address-by-id/:id", getAddressesByID);

export default router;
