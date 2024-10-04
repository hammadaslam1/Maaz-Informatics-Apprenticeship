import { NextResponse } from "next/server";
import database from "../../../../../lib/database";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1month",
  });
  return token;
};
export const POST = async (req) => {
  try {
    const body = await req.json();
    console.log(body);
    const userEmail = body.email;
    const pword = body.password;
    const user = "SELECT * FROM users WHERE email = ?";
    const values = [userEmail];
    const [result] = await database.query(user, values);
    if (!result.length) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const { password, ...selectedUser } = result[0];
    const isMatch = await bcryptjs.compare(pword, password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }
    return NextResponse.json({
      success: true,
      message: "User retrieved successfully",
      user: selectedUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
