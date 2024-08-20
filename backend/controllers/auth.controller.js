import User from "../models/auth.model.js";

export const signup = async (req, res, next) => {
  console.log("Signup request received");
  const { name, email, password } = req.body;
  const users = await User.find({ email: email });
  const existingEmail = users != "" ? true : false;
  if (existingEmail) {
    return res.status(400).json({ message: "Email Already Exists" });
    
  }
  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({
    username: email.split("@")[0],
    name,
    email,
    password: password,
  });
  console.log(newUser);
  try {
    await newUser.save();
    return res.status(200).json({ message: "signup successful" });
  } catch (error) {
    return res.status(500).json({ message: "Signup Failed" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(500).json({ message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(500).json({ message: "User is not valid" });
    }
    const { password: password, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie("access_token", {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return res.status(500).json({ message: 'Signin Failed' });
  }
};
