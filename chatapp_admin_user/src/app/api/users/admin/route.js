import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export const GET = async (req) => {
  try {
    const results = await prisma.users.findMany({
      where: {
        full_access: false,
      },
    });
    if (!results.length) {
      return NextResponse.json({
        success: false,
        message: "no user found",
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
