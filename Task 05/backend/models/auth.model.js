import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
