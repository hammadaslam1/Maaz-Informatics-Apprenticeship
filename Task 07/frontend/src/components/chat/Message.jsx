import React from "react";

const Message = ({ text, username, time }) => {
  const date = new Date(time);
  return (
    <div className="message">
      <strong>{username}:</strong> <span className="message-text">{text}</span>
      <div>
        <span className="time">
          {date?.toLocaleString(undefined, {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;
