import ReceivedMessage from "./ReceivedMessage";
import SelfMessage from "./SelfMessage";

const layout = ({ selfmessage, receivedmessage }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex min-h-16 w-full items-center bg-[#ada8b6]">
        user name
      </div>
      <div className="flex flex-grow flex-col w-full overflow-auto no-scrollbar">
        {new Array(20)
          .fill(1)
          .map((data, i) =>
            i % 2 === 0 ? <SelfMessage key={i} index={i} /> : <ReceivedMessage key={i} index={i} />
          )}
      </div>
      <div className="flex min-h-14 w-full items-center bg-[#eff8e2]">
        message box
      </div>
    </div>
  );
};

export default layout;
