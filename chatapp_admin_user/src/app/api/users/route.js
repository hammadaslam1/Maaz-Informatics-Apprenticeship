import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export const GET = async (req) => {
  try {
    const results = await prisma.users.findMany({
      where: {
        is_admin: true,
        full_access: true,
      },
    });
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
