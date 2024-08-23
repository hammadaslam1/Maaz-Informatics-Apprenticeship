import Student from "../models/student.model.js";

export const createStudent = (req, res, next) => {
  const { id, name, email, street, hometown } = req.body;
  try {
    const newStudent = new Student({ _id: id, name, email, street, hometown });

    newStudent.save();
    res.status(200).json(newStudent);
  } catch {
    res.status(500).json({ message: "Error saving student" });
  }
  next();
};
