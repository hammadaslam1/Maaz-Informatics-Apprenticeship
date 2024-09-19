import React from "react";

const Message = ({ text, username, time }) => {
  return (
    <div className="message">
        <div className="corner"></div>
      <strong>{username}:</strong> <span className="message-text">{text}</span>
      <div>
        <span className="time">{time}</span>
      </div>
    </div>
  );
};

export default Message;
