import Student from "../models/student.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.model.js";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const createUser = async (req, res) => {
  const { first_name, last_name, email, my_class, password, role, subject } =
    req.body;
  console.log("controller: ", req.body);

  try {
    // const Model =
    //   role === "student" ? Student : role === "teacher" ? Teacher : null;
    // if (!Model) {
    //   return res.status(400).json({ message: "Invalid role" });
    // }
    const user = await Student.findOne({ email: email });
    // const teacher = await Teacher.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new Student({
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
      .json({ message: "user is created successfully", role: newUser.role });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  const email = req.body.email;
  const pword = req.body.password;
  const role = req.body.role;
  try {
    // const Model =
    //   role === "student" ? Student : role === "teacher" ? Teacher : null;
    // if (!Model) {
    //   return res.status(400).json({ message: "Invalid role" });
    // }
    const user = await Student.findOne({ email: email }).select({
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
