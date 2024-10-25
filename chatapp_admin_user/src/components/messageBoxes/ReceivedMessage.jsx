import { formatTime } from "@/utils/commonUtils";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ReceivedMessage = ({ message, index }) => {
  const { selectedUser } = useSelector((state) => state.user);
  const scrollRef = useRef(null);
  const { status, text } = message;
  const str = text?.replace(/(?:\r\n|\r|\n)/g, `<br>`);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [message]);
  return (
    <div
      key={index}
      className="flex max-h-60 min-w-28 max-w-96 w-fit h-fit m-4 bg-[#eff8e2] flex-col rounded-lg"
      ref={scrollRef}
    >
      <div className="flex items-center h-fit pt-1 px-2 font-bold text-xs text-gray-700">
        ~{selectedUser?.username}
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
        <div className="flex items-center w-1 aspect-square justify-center text-xs"></div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
