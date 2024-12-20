import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: true,
    },
    student_name: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    hometown: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("addresses", addressSchema);

export default Address;
