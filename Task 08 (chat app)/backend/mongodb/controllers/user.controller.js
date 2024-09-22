import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const username = email.split("@")[0];
  const exist = await User.find({ email: email });
  if (exist.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    name: name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    ),
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  await newUser.save();
  const token = createToken(newUser._id);
  res
    .status(200)
    .cookie("access_token", {
      httpOnly: true,
    })
    .json({ token, user: newUser });
};

export const login = async (req, res) => {
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
