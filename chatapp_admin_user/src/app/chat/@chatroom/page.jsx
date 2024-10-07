const page = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex h-16 w-full items-center bg-[#cecfc7]">
        user name
      </div>
      <div className="flex flex-grow w-full items-center justify-center">
        messages
      </div>
      <div className="flex h-14 w-full items-center bg-[#eff8e2]">
        message box
      </div>
    </div>
  );
};

export default page;
