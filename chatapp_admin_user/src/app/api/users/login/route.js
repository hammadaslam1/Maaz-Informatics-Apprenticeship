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

const select = {
  id: true,
  name: true,
  email: true,
  username: true,
  full_access: true,
  is_admin: true,
  created_at: true,
  updated_at: true,
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
    let users = [];
    if (result.full_access) {
      users = await prisma.users.findMany({
        where: { full_access: false },
        select,
      });
    } else if (result.is_admin) {
      users = await prisma.users.findMany({
        where: { id: { not: result.id } },
        select,
      });
    } else {
      users = await prisma.users.findMany({
        where: {
          is_admin: true,
        },
        select,
      });
    }
    const messages = await prisma.messages.findMany();
    const token = createToken(result.email);
    return NextResponse.json({
      success: true,
      message: "User retrieved successfully",
      user: selectedUser,
      otherUsers: users,
      messages,
      token,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
