import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import File from "../models/files.model.js";
import { request } from "express";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const createUser = async (req, res) => {
  let { first_name, last_name, email, password, role, classes } = req.body;

  try {
    const user = await Teacher.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "student already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new Teacher({
      first_name: first_name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      last_name: last_name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      email: email.toLowerCase(),
      classes: classes.map((singleClass) => {
        singleClass.class = singleClass.class.toUpperCase();
        singleClass.subject = singleClass.subject.map((subject) =>
          subject.toUpperCase()
        );
        return singleClass;
      }),
      password: hashedPassword,
      role: role.toUpperCase(),
    });
    await newUser.save();
    res
      .status(200)
      .cookie("access_token", {
        httpOnly: true,
      })
      .json({ message: "teacher is created successfully", role: newUser.role });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  const email = req.body.email;
  const pword = req.body.password;
  try {
    const user = await Teacher.findOne({ email: email.toLowerCase() }).select({
      email: 0,
      __v: 0,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(pword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = createToken(user._id);
    const { password, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", {
        httpOnly: true,
      })
      .json({ token, user: rest });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUsersByID = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findOne({ _id: id }).select({
      subject: 1,
    });
    const teachers = await Teacher.find({
      subject: { $in: teacher.subject },
    });
    if (teachers.length == 0) {
      return res.status(404).json({ message: "students not found" });
    }
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUsersByTeacherAndSubject = async (req, res) => {
  const { id, subject, classes } = req.params;
  try {
    const teacher = await Teacher.findOne({ _id: id }).select({
      classes: 1,
    });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found" });
    }
    const teachesClass = teacher.classes.find(
      (c) => c.class.toUpperCase() === classes.toUpperCase()
    );
    console.log(teachesClass);
    if (
      !teachesClass ||
      !teachesClass.subject.includes(subject.toUpperCase())
    ) {
      return res
        .status(403)
        .json({ message: "teacher does not teach the subject" });
    }
    const students = await Student.find({
      "classes.name": classes.toUpperCase(),
      "classes.subject": subject.toUpperCase(),
    }).select({
      _id: 1,
      first_name: 1,
      last_name: 1,
      email: 1,
    });
    if (students.length == 0) {
      return res.status(200).json({ message: "students not found" });
    }
    res.status(200).json(students);
  } catch (error) {}
};

export const assignmentUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { path, filename } = req.file;

    const newPath = path.replace(/\\/g, "/");
    const newFile = File({
      file: newPath,
      subject: req.body.subject.toUpperCase(),
      class: req.body.class.toUpperCase(),
    });
    if (!newFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await newFile.save();
    res.status(200).json({ message: "File uploaded successfully", filename });
  } catch (error) {
    res.status(500).json({ error });
  }
};
