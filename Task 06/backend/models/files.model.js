import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
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

const TeacherFiles = mongoose.model("teacherFile", fileSchema);

export default TeacherFiles;
