import { NextResponse } from "next/server";
import database from "../../../../lib/database";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1month",
  });
  return token;
};
export const GET = async (req) => {
  const id = 2
  try {
    const [results] = await database.query(
      "SELECT * FROM messages where conversation_id = " + id
    );
    if (!results.length) {
      return NextResponse.json({
        success: false,
        message: "no user not found",
      });
    }
    let users = [];
    results.forEach((row) => {
      const { password, ...selectedUser } = row;
      users.push(selectedUser);
    });
    return NextResponse.json({
      success: true,
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
