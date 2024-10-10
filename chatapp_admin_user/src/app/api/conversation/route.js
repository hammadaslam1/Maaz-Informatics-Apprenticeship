import { NextResponse } from "next/server";
import database from "../../../../lib/database";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { user_id, admin_id } = body;

    const get =
      "SELECT * FROM conversations WHERE user_id = ? AND admin_id = ?";
    const getValues = [user_id, admin_id];
    const [got] = await database.query(get, getValues);

    if (got.length) {
      return NextResponse.json({
        success: true,
        message: "Conversation already exists",
        conversation: got[0],
      });
    }

    const insertQuery =
      "INSERT INTO conversations (id, user_id, admin_id) VALUES (?, ?, ?)";
    const insertValues = [user_id, user_id, admin_id];
    await database.query(insertQuery, insertValues);

    const [newConversation] = await database.query(get, getValues);

    return NextResponse.json({
      success: true,
      message: "Conversation created successfully",
      conversation: newConversation[0],
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
