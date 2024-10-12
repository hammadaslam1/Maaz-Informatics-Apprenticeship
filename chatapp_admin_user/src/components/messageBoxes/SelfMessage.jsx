"use client";

import { formatTime } from "@/utils/commonUtils";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MdDone, MdError, MdDoneAll } from "react-icons/md";
const SelfMessage = ({ message, index }) => {
  const { currentUser, selectedUser } = useSelector((state) => state.user);
  const { status, text } = message;
  const str = text?.replace(/(?:\r\n|\r|\n)/g, `<br>`);

  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [message]);
  return (
    <div
      key={index}
      className="flex max-h-60 min-w-28 max-w-96 w-fit h-fit m-4 ml-auto bg-[#cecfc7] flex-col rounded-lg"
      ref={scrollRef}
      // onClick={() => alert(message?.id)}
    >
      <div className="flex items-center h-fit pt-1 px-2 font-bold text-xs text-gray-700">
        ~{currentUser?.username}
      </div>
      {/* <div className="h-1"></div> */}
      <p
        className="flex items-center min-h-fit flex-grow text-sm px-3 pb-1 break-words leading-none min-h-4"
        dangerouslySetInnerHTML={{ __html: str }}
      >
        {/* {str} */}
      </p>
      <div className="flex items-center h-4">
        <div className="flex items-center h-4 flex-grow"></div>
        <div className="flex items-center h-4 w-fit font-bold text-[0.6rem] text-gray-700">
          {formatTime(message?.created_at)}
        </div>
        <div className="flex items-center h-4 aspect-square justify-center text-xs">
          {status === "sent" ? (
            <MdDone />
          ) : status === "delivered" ? (
            <MdDoneAll />
          ) : status === "seen" ? (
            <MdDoneAll />
          ) : (
            <MdError />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfMessage;
