import React from "react";
import Message from "./Message";

const ChatRoom = ({ messages }) => {
  return (
    <div className="chatroom-container">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <Message
        //   className={own?'right':'left'}
            key={index}
            text={msg?.message}
            username={msg?.username}
            time={msg?.createdAt}
          />
        ))
      ) : (
        <div className="no-messages">No messages yet!</div>
      )}
    </div>
  );
};

export default ChatRoom;
