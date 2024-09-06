import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const signupUser = async (req, res) => {
  const { first_name, last_name, my_email, my_class, my_password } = req.body;
  console.log("controller: ", req.body);

  try {
    if (!first_name || !last_name || !my_email || !my_class || !my_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: my_email });
    console.log("user: ", user);
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(my_password, 10);
    console.log(hashedPassword);

    const newUser = new User({
      first_name,
      last_name,
      email: my_email,
      class: my_class,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({ message: "user creation failed" });
    }
    await newUser.save();
    res.status(201).json({ message: "user is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { my_email, my_password } = req.body;
  try {
    if (!my_email || !my_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: my_email }).select({
      email: 0,
      __v: 0,
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(my_password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = createToken(user._id);
    // const rest = {
    //   _id: user._id,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   class: user.class,
    // };
    const { password, ...rest } = user._doc;
    res.status(200).json({ token, user: rest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
