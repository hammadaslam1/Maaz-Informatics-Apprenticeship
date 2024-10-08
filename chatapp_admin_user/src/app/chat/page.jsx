import AllUsers from "./@allusers/page";
import ChatroomLayout from "./@chatroom/layout";

const Page = () => {
  return (
    <div className="flex h-screen flex-grow">
      <div className="flex-[2] min-w-72 h-full flex justify-center items-center">
        <AllUsers />
      </div>
      <div className="w-px bg-gray-500"></div>
      <div className="flex-[5] h-full flex justify-center items-center">
        <ChatroomLayout />
      </div>
    </div>
  );
};

export default Page;
