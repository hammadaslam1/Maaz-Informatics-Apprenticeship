import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
export const createUser = async (req, res) => {
  console.log(req.body);

  const { name, email } = req.body;
  const pword = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "user already exists" });
    }

    const hashedPassword = await bcryptjs.hash(pword, 10);

    const newUser = new User({
      name: name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      username: email.split("@")[0],
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    const { password, ...rest } = newUser._doc;
    console.log("signed up");

    res
      .status(200)
      .cookie("access_token", {
        httpOnly: true,
      })
      .json({
        message: "user is created successfully",
        user: rest,
        token: token,
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  const email = req.body.email;
  const pword = req.body.password;
  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select({
      __v: 0,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(pword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = createToken(user._id);
    const { password, ...rest } = user._doc;
    console.log("logged in");
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
