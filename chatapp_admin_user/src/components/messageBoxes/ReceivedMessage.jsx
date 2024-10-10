import { useSelector } from "react-redux";

const ReceivedMessage = ({ message, index }) => {
  const { selectedUser } = useSelector((state) => state.user);
  return (
    <div
      key={index}
      className="flex min-h-16 min-w-28 w-fit m-4 bg-[#eff8e2] flex-col rounded-lg"
    >
      <div className="flex items-center h-fit pt-1 px-2 font-bold text-xs text-gray-700">
        ~{selectedUser?.username}
      </div>
      {/* <div className="h-1"></div> */}
      <div className="flex items-center flex-grow px-3 pb-1">
        {message?.text}
      </div>
      <div className="flex items-center h-4">
        <div className="flex items-center h-4 flex-grow"></div>
        <div className="flex items-center h-4 w-fit font-bold text-xs text-gray-700">
          {message?.created_at}
        </div>
        <div className="flex items-center h-4 aspect-square justify-center text-xs">
          
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
