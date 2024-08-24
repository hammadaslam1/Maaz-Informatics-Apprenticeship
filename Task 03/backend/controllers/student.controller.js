import { request } from "express";
import Student from "../models/student.model.js";

export const createStudent = async (req, res, next) => {
  console.log("createStudent");
  try {
    const { path, filename } = req.file;
    console.log(filename);
    const { id, name, email } = req.body;
    const newPath = path.replace(/\\/g, "/");
    if (id == "" || name == "" || email == "" || !id || !name || !email) {
      return res
        .status(500)
        .json({ message: "Please fill all required fields." });
    }
    console.log(req.body);
    const newStudent = new Student({
      student_id: id,
      name,
      email,
      image: newPath,
    });

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

export const updateStudent = async (req, res) => {
  try {
    const { path, filename } = req.file;
    const { id, name, email } = req.body;
    const newPath = path.replace(/\\/g, "/");

    if (id == "" || name == "" || email == "" || !id || !name || !email) {
      return res
        .status(500)
        .json({ message: "Please fill all required fields." });
    }
    const newObject = {
      student_id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      image: newPath,
    };
    console.log(newObject);
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      newObject
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    // await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};
