/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDispatch, useSelector } from "react-redux";
import AllUsers from "./@allusers/page";
import ChatroomLayout from "./@chatroom/layout";
import ChatDefault from "@/components/defaults/ChatDefault";
import socketio from "../socketio";
import {
  setConversationSelected,
  setNewMessage,
} from "../../../lib/redux/userSlice/UserReducer";
import { useEffect, useState } from "react";

const Page = () => {
  const { selectedUser, currentUser, otherUsers } = useSelector(
    (state) => state.user
  );
  const [chat, setChat] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    socketio.on("newMessage", async (data) => {
      console.log(data);
      if (data?.success) {
        dispatch(setNewMessage(data?.newMessage));
        if (
          currentUser?.is_admin &&
          data?.newMessage?.sender_id !== currentUser?.id &&
          data?.newMessage?.conversation_id !== selectedUser?.id
        ) {
          otherUsers.forEach((user) => {
            if (user.id == data?.newMessage?.conversation_id) {
              if (Notification.permission === "granted") {
                const notification = new Notification(user?.name, {
                  body: data?.newMessage?.text,
                });
                console.log("new user is: ", user);
                notification.onclick = function () {
                  dispatch(setConversationSelected(user));
                };
              } else {
                Notification.requestPermission();
              }
            }
          });
        } else if (
          !currentUser?.is_admin &&
          data?.newMessage?.conversation_id === currentUser?.id &&
          !selectedUser
        ) {
          otherUsers.forEach((user) => {
            if (user.id == data?.newMessage?.sender_id) {
              if (Notification.permission === "granted") {
                const notification = new Notification(user?.name, {
                  body: data?.newMessage?.text,
                });
                console.log("new user is: ", user);
                notification.onclick = function () {
                  dispatch(setConversationSelected(user));
                };
              } else {
                Notification.requestPermission();
              }
            }
          });
        }
      } else {
        console.log("Failed: ", data);
      }
    });
    return () => {
      socketio.off("newMessage");
    };
  }, [selectedUser]);
  return (
    <div className="flex h-screen flex-grow">
      <div className="flex-[2] min-w-72 h-full flex justify-center items-center">
        <AllUsers />
      </div>
      <div className="w-px bg-gray-500"></div>
      <div className="flex-[5] h-full flex justify-center items-center">
        {selectedUser ? <ChatroomLayout /> : <ChatDefault />}
      </div>
    </div>
  );
};

export default Page;
