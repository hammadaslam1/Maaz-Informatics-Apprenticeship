import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const studentAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this route." });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Student.findOne({ _id }).select("_id");
    console.log("authorized");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

export const teacherAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this route." });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Teacher.findOne({ _id }).select("_id");
    console.log("authorized");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
