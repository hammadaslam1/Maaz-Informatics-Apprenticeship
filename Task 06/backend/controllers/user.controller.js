import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log(hashedPassword);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    await newUser.save();
    res.status(201).json({ message: "user is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
