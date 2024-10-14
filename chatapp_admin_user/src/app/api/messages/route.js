import { NextResponse } from "next/server";
import database from "../../../../lib/database";
import prisma from "../../../../prisma/client";


export const POST = async (req) => {
  try {
    const body = await req.json();
    const { conversation_id, sender_id, text, type } = body;
    const newMessage = await prisma.messages.create({
      data: {
        conversationId: conversation_id,
        senderId: sender_id,
        text: text,
        type: type,
      },
    });
    await prisma.conversations.update({
      where: {
        user_id: conversation_id,
      },
      data: {
        lastMessage: text,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      newMessage: newMessage,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
