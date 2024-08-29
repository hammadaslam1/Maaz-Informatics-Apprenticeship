import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";

export const requireAuth = async (req, res, next) => {
    console.log(req.headers);
    
  const { authorization } = req.headers;
  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this route." });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Auth.findOne({ _id }).select('_id')
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
