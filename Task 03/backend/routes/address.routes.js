import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  getAddressesByID,
  getAddressesByStudentID,
  updateAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.get("/get-addresses", getAddresses);
router.post("/create-address", createAddress);
router.get("/get-address-by-student-id/:id", getAddressesByStudentID);
router.get("/get-address-by-id/:id", getAddressesByID);
router.put("/update-address/:id", updateAddress);
router.delete("/delete-address/:id", deleteAddress);

export default router;
