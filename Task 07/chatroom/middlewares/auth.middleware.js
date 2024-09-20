import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this route." });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    if (!req.user) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    console.log("authorized");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
