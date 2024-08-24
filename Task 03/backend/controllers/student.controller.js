import Student from "../models/student.model.js";

export const createStudent = async (req, res, next) => {
  const { id, name, email } = req.body;
  try {
    const newStudent = new Student({ _id: id, name, email });

    await newStudent.save();
    res.status(200).json(newStudent);
  } catch {
    res.status(500).json({ message: "Error saving student" });
  }
  next();
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error getting students" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};