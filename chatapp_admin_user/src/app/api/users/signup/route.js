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
    const { name, email, is_admin, full_access } = body;
    const pword = body.password;
    const username = email.split("@")[0];
    const hashedPassword = await bcryptjs.hash(pword, 10);
    const isUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (isUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const result = await prisma.users.create({
      data: {
        name,
        email,
        username,
        is_admin,
        full_access,
        password: hashedPassword,
      },
    });
    console.log(result);
    const { password, ...user } = result;
    const token = createToken(result.email);
    return NextResponse.json({
      success: true,
      message: "User added successfully",
      user,
      token,
    });
  } catch (error) {}
};
