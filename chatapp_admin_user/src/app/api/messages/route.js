import { NextResponse } from "next/server";
import database from "../../../../lib/database";
import prisma from "../../../../prisma/client";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { conversation_id, sender_id, text, type } = body;
    const conv_id =
      typeof conversation_id === "string"
        ? parseInt(conversation_id, 10)
        : conversation_id;
    const send_id =
      typeof sender_id === "string" ? parseInt(sender_id, 10) : sender_id;
    console.log(body);
    const newMessage = await prisma.messages.create({
      data: {
        conversation_id: conv_id,
        sender_id: send_id,
        text: text,
        type: type,
      },
    });
    await prisma.conversations.updateMany({
      where: {
        user_id: conv_id,
      },
      data: {
        last_message: text,
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
