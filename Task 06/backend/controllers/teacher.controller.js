import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import File from "../models/files.model.js";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const createUser = async (req, res) => {
  const { first_name, last_name, email, password, role, subject } = req.body;
  const my_class = req.body.class;

  try {
    const user = await Teacher.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "student already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new Teacher({
      first_name,
      last_name,
      email,
      class: my_class,
      password: hashedPassword,
      role,
      subject,
    });
    await newUser.save();
    res
      .status(200)
      .cookie("access_token", {
        httpOnly: true,
      })
      .json({ message: "teacher is created successfully", role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  const email = req.body.email;
  const pword = req.body.password;
  try {
    const user = await Teacher.findOne({ email: email }).select({
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

export const fileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { path, filename } = req.file;

    const newPath = path.replace(/\\/g, "/");
    const newFile = File({
      file: newPath,
      ...req.body,
    });
    console.log("ok");
    if (!newFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await newFile.save();
    res.status(200).json({ message: "File uploaded successfully", filename });
  } catch (error) {
    res.status(500).json({ error });
  }
};
