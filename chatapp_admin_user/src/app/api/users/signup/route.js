import { NextResponse } from "next/server";
import database from "../../../../../lib/database";
import bcryptjs from "bcryptjs";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, email, password, is_admin } = body;
    const username = email.split("@")[0];
    const hashedPassword = await bcryptjs.hash(password, 10);
    const query =
      "INSERT INTO users (name, email, username, is_admin, password) VALUES (?, ?, ?, ?, ?)";
    const values = [name, email, username, is_admin, hashedPassword];

    const [result] = await database.query(query, values);
    // console.log(result);
    return NextResponse.json({
      success: true,
      message: "User added successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
