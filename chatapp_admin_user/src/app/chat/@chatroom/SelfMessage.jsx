const SelfMessage = ({ key, index }) => {
  return (
    <div
      key={key}
      className="flex min-h-16 min-w-28 w-fit m-4 ml-auto bg-[#ada8b6] flex-col rounded-lg"
    >
      <div className="flex items-center h-fit pt-1 px-2 font-bold text-xs text-gray-700">~Hammad Aslam</div>
      {/* <div className="h-1"></div> */}
      <div className="flex items-center flex-grow px-3 pb-1">hey! my name is hammad aslam</div>
      <div className="flex items-center h-4">
        <div className="flex items-center h-4 flex-grow"></div>
        <div className="flex items-center h-4 w-fit font-bold text-xs text-gray-700">11:11 am</div>
        <div className="flex items-center h-4 aspect-square justify-center text-xs">🖍</div>
      </div>
    </div>
  );
};

export default SelfMessage;
