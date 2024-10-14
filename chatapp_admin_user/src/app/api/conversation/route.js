import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { user_id, admin_id } = body;
    const exist = await prisma.conversations.findUnique({
      where: {
        user_id,
        admin_id,
      },
    });
    if (exist) {
      return NextResponse.json({
        success: true,
        message: "Conversation already exists",
        conversation: exist,
      });
    }
    const newConversation = await prisma.conversations.create({
      data: {
        id: user_id,
        user_id,
        admin_id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Conversation created successfully",
      conversation: newConversation,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
