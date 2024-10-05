"use client";
import socketio from "@/app/socketio";
import { useState, useEffect } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socketio.emit("userOnline");
    socketio.on("getAllUsers", async (data) => {
      setUsers(data);
    });
  }, []);
  return (
    <div>
      <h1>All Users</h1>
      <ul className="flex flex-col gap-6">
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
