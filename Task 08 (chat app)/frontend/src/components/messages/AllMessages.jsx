/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { Box } from "@mui/material";
import Footer from "../navbars/Footer";
import SelfMessage from "./SelfMessage";
import SenderMessage from "./SenderMessage";
import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client';
import { useSelector } from "react-redux";


const socket = io('http://localhost:3001');

const AllMessages = ({ person, receiver, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const { currentUser } = useSelector(state => state.user)
  const { selectedUser } = useSelector(state => state.conversation)
  const scrollRef = useRef();

  const sendMessage = () => {
    let message = {};
    if (!file) {
      message = {
        senderId: person?._id,
        receiverId: receiver?._id,
        conversationId: conversation?._id,
        type: 'text',
        text: value
      };
    } else {
      message = {
        senderId: person?._id,
        receiverId: receiver?._id,
        conversationId: conversation?._id,
        type: 'media',
        text: image
      };
    }
    alert(JSON.stringify(message))
    socket.emit('sendMessage', message);
    setValue('');
    setFile();
    setImage('');
  }
  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;
    if (code === 13) {
      sendMessage()
    }
  }
  useEffect(() => {
    socket.on('newMessage', data => {
      setIncomingMessage({
        ...data.message,
        createdAt: Date.now()
      })
    })
    return () => {
      socket.off('newMessage');
    }
  }, [conversation]);
  useEffect(() => {
    if (conversation?._id) {
      socket.emit("joinConversation", conversation?._id);  // Join the conversation room
    }
  }, [conversation]);
  useEffect(() => {
    socket.on("receiveConversation", (data) => {
      // if (data[0]?.conversationId === conversation?._id) {
        socket.emit('getMessages', data?._id)
      // }
    })
    socket.on("getMessage", (data) => {
      if (data[0]?.conversationId === conversation?._id) {

        console.log(data);
        setMessages((prev) => data);
        setValue('');
        setFile();
        setImage('');
      } else {
        console.log('not in the conversation');
        setMessages([]);
        setValue('');
        setFile();
        setImage('');
        setIncomingMessage(null);
      }
    })
    return () => {
      socket.off("receiveConversation");
      socket.off("getMessage");
    }
  }, [conversation]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
  }, [messages]);
  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);
  return (
    <Box
      sx={{
        backgroundImage: `url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"})`,
        backgroundSize: "70%",
      }}
    >
      <Box sx={{ height: "79vh", overflowY: "scroll" }}>
        {messages &&
          messages.map((message, i) => (
            <Box
              sx={{ padding: "1px 80px" }}
              key={i}
              ref={scrollRef}
            >
              {selectedUser?._id == message.senderId ?
                <SenderMessage message={message} /> :
                <SelfMessage message={message} />
              }
            </Box>
          ))}
      </Box>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
        sendMessage={sendMessage}
      />
    </Box>
  );
};

export default AllMessages;
