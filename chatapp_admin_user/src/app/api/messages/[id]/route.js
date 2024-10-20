import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export const GET = async (req, { params }) => {
  try {
    const id = params.id;
    const messages = await prisma.messages.findMany({
      where: {
        conversation_id: id,
      },
    });
    if (!messages.length) {
      return NextResponse.json({
        success: false,
        message: "No messages found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Messages retrieved successfully",
      messages,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
