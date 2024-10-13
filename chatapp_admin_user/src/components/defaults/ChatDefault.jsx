import { PiChatTeardropTextFill } from "react-icons/pi";

const ChatDefault = () => {
  return (
    <div className="flex-[5] h-full flex flex-col justify-center items-center">
      <div className="h-48 aspect-square ">
        <PiChatTeardropTextFill className="text-[12rem]" color="#23022e" />
      </div>
      <div className="max-h-60 max-w-96 overflow-y-hidden">
        <h1 className="text-3xl font-semibold text-center text-[#23022e]">
          Welcome to the Chat App.
        </h1>
        <h2 className="text-xl text-center text-[#23022e]">
          Start a conversation by selecting a user from the left sidebar.
        </h2>
        <p className="text-base text-[#ada8b6] text-center">
          Use the chat input field to send messages.
        </p>
        <h1 className="text-2xl font-semibold text-center text-[#ada8b6]">
          Powered by{" "}
          <a
            className="text-3xl font-semibold text-center text-[#23022e] underline"
            href="http://github.com/hammadaslam1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hammad Aslam
          </a>
        </h1>
      </div>
    </div>
  );
};

export default ChatDefault;
