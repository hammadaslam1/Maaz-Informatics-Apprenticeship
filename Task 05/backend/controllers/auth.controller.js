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

export const loginAuth = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = createToken(user._id);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}