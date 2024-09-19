import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
    //   setInputValue("");
    }
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
