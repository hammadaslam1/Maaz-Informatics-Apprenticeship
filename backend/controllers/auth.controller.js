import User from "../models/auth.model.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const users = await User.find({ email: email });
  const existingEmail = users != "";
  if (existingEmail) {
    return res.status(409).json({ message: "Email Already Exists" });
  } else {
    const newUser = new User({
      username: email.split("@")[0],
      name,
      email,
      password: password,
    });

    try {
      const { password: password, ...rest } = newUser;
      await newUser.save();
      return res
        .status(200)
        .cookie("access_token", {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      return res.status(500).json({ message: "Signup Failed" });
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (validUser == null) {
      res.status(401).json({ message: "not found" });
    } else {
      const { password: password, ...rest } = validUser._doc;

      if (password === validUser.password) {
        res
          .status(200)
          .cookie("access_token", {
            httpOnly: true,
          })
          .json(rest);
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Signin Failed" });
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    next(errorHandler(404, "User not found"));
  }
};
