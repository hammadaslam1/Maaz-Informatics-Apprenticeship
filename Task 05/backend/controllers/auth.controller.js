import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";
import bcryptjs from "bcryptjs";

const createToken = (_id) => {
  console.log(process.env.JWT_SECRET);

  const token = jwt.sign({ _id }, "mynameishammadaslam10", { expiresIn: "1h" });
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
    console.log(token);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
