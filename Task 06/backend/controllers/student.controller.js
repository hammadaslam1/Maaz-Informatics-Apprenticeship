import Student from "../models/student.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.model.js";
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
    const user = await Student.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "student already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new Student({
      first_name: first_name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      last_name: last_name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      email: email.toLowerCase(),
      class: my_class.toUpperCase(),
      password: hashedPassword,
      role: role.toUpperCase(),
      subject: subject.map((s) => s.toUpperCase()),
    });
    await newUser.save();
    res
      .status(200)
      .cookie("access_token", {
        httpOnly: true,
      })
      .json({ message: "user is created successfully", role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  const email = req.body.email;
  const pword = req.body.password;
  try {
    const user = await Student.findOne({ email: email.toLowerCase() }).select({
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
    console.log("running");

    const teacher = await Teacher.findOne({ _id: id }).select({
      subject: 1,
      class: 1,
    });
    console.log(teacher);

    if (!teacher) {
      return res.status(400).json({ message: "teacher not found" });
    }
    const students = await Student.find({
      class: teacher.class.toLowerCase(),
      subject: { $in: teacher.subject },
    }).select({
      first_name: 1,
      last_name: 1,
      email: 1,
      _id: 1,
    });
    if (students.length == 0) {
      return res.status(200).json({ message: "students not found" });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getFilesBySubject = async (req, res) => {
  const { subject } = req.params;
  const classes = req.params.class;
  try {
    const files = await File.find({
      subject: subject.toUpperCase(),
      class: classes.toUpperCase(),
    });
    if (files.length == 0) {
      return res.status(404).json({ message: "files not found" });
    }
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error });
  }
};
