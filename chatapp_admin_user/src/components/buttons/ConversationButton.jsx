"use client";

import { Avatar, Badge, Button, Typography } from "@mui/material";
import { useState } from "react";

const ConversationButton = ({ key, id, name, newChat }) => {
  const [count, setCount] = useState(1);
  return (
    <button
      key={key}
      className="w-full h-16 flex items-center transition-all hover:bg-[#eff8e2] active:bg-[#cecfc7] focus:bg-[#cecfc7] focus:border-r-[3px] border-[#23022e]"
    >
      <div className="h-full aspect-square flex justify-center items-center">
        <Avatar src="" />
      </div>
      <Typography variant="body2" className="flex flex-grow">
        {name}
      </Typography>
      {count && count > 0 && (
        <div className="h-full w-fit p-4 flex justify-center items-center">
          <Badge badgeContent={count} className="text-3xl" color="#23022e" />
        </div>
      )}
    </button>
  );
};

export default ConversationButton;
