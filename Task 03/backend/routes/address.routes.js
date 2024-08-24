import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddressesByID,
  getAddressesByStudentID,
  updateAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/create-address", createAddress);
router.get("/get-address-by-student-id/:id", getAddressesByStudentID);
router.get("/get-address-by-id/:id", getAddressesByID);
router.post("/update-address/:id", updateAddress);
router.get("/delete-address/:id", deleteAddress);

export default router;
