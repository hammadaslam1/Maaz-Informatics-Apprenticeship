import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";
import bcryptjs from "bcryptjs";

const createToken = (_id) => {
  console.log(process.env.JWT_SECRET);

  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

export const createAuth = async (req, res) => {
  try {
    const email = req.body.email;
    const username = email.split("@")[0];
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const user = new Auth({
      name: req.body.name,
      email: email,
      username: username,
      password: hashedPassword,
    });
    await user.save();
    const token = createToken(user._id);
    const { password, ...rest } = user._doc;
    console.log(token);
    res
      .status(201)
      .cookie(token, {
        httpOnly: true,
      })
      .json({ user: rest, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginAuth = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const isMatch = await bcryptjs.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { password, ...rest } = user._doc;

    const token = createToken(user._id);
    res
      .status(200)
      .cookie(token, {
        httpOnly: true,
      })
      .json({ user: rest, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAuth = async (req, res) => {
  try {
    const { _id } = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const user = await Auth.findOne({ _id }).select("username");
    // console.log(document.cookie)
    res
      .clearCookie(req.body.token)
      .status(200)
      .json(`${user.username} has been signed out`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
