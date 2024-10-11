import { NextResponse } from "next/server";
import database from "../../../../lib/database";

export const POST = async (req) => {
  const body = await req.json();
  const { conversation_id, sender_id, text, type } = body;
  try {
    const query =
      "INSERT INTO messages (conversation_id, sender_id, text, type) VALUES (?, ?, ?, ?)";
    const values = [conversation_id, sender_id, text, type];
    const [result] = await database.query(query, values);
    const setQuery = "UPDATE conversations SET last_message=? WHERE user_id=?";
    const setValues = [text, conversation_id];
    await database.query(setQuery, setValues);
    const getQuery = "SELECT * FROM messages WHERE id=?";
    const getValues = [result.insertId];
    const [message] = await database.query(getQuery, getValues);
    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      newMessage: message[0],
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
