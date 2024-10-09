import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import database from "../../../../../lib/database";
import jwt from "jsonwebtoken";

const createToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1month",
  });
  return token;
};
export const GET = async (req, {params}) => {
  const id = params.id;
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
      messages: users,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
