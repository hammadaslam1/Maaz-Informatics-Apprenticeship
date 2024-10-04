import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import EmptyChat from "./EmptyChat";

const RightComponent = () => {
  const { conversationSelected } = useSelector(state => state.conversation)
  return conversationSelected ? <ChatBox /> : <EmptyChat />

};

export default RightComponent;
