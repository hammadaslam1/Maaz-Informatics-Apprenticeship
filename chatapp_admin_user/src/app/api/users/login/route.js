import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../../../prisma/client";

const createToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const userEmail = body.email;
    const pword = body.password;
    const result = await prisma.users.findUnique({
      where: { email: userEmail },
    });

    if (!result) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(pword, result.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }
    console.log(result);
    const { password, ...selectedUser } = result;
    const token = createToken(result.email);
    return NextResponse.json({
      success: true,
      message: "User retrieved successfully",
      user: selectedUser,
      token,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
