import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("file", fileSchema);

export default File;
