import { NextResponse } from "next/server";
import database from "../database/database";


export const GET = async () => {
    const [results] = await database.query("SELECT * FROM users")
    return NextResponse.json(results)
}

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { name, email } = body; // Replace with your form fields

        // Insert data into MySQL
        const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
        const values = [name, email];

        const [result] = await database.query(query, values);

        return NextResponse.json({ success: true, message: 'User added successfully', result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { id, name, email } = body; // Replace with your form fields
        const query = 'UPDATE users SET name =?, email =? WHERE id =?';
        const values = [name, email, id];
        const [result] = await database.query(query, values);
        return NextResponse.json({ success: true, message: 'User updated successfully', result });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

export const DELETE = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const query = 'DELETE FROM users WHERE id =?';
        const values = [id];
        const [result] = await database.query(query, values);
        return NextResponse.json({ success: true, message: 'User deleted successfully', result });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}