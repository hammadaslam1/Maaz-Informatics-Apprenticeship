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

const AllMessages = ({ person, conversationId, receiver, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const { currentUser } = useSelector(state => state.user)
  const { selectedUser } = useSelector(state => state.conversation)

  const scrollRef = useRef();
  // alert(JSON.stringify(conversation))

  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;

    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: person._id,
          receiverId: receiver._id,
          conversationId: conversation._id,
          type: 'text',
          text: value
        };
      } else {
        message = {
          senderId: person._id,
          receiverId: receiver._id,
          conversationId: conversation._id,
          type: 'media',
          text: image
        };
      }
      alert(JSON.stringify(message));
      socket.emit('sendMessage', message);

      setValue('');
      setFile();
      setImage('');
    }
  }
  useEffect(() => {
    socket.on('getMessage', data => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now()
      })
    })
  }, []);
  const getMessageDetails = async (id) => {
    fetch(`http://localhost:3001/api/message/get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to fetch messages");
      return response.json();
    }).then((data) => setMessages(data)).catch((err) => console.error(err)
    )
  }
  useEffect(() => {
    socket.on("receiveConversation", (data) => {
      socket.emit('getMessages', data._id)

    })
    socket.on("getMessage", (data) => {
      console.log(data);
      setMessages((prev) => data);
      setValue('');
      setFile();
      setImage('');
    })
  }, [conversation, receiver]);
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
            > {message.senderId}
              {selectedUser?.user?._id == message.senderId &&
                <SenderMessage message={message} />}
              {currentUser?.user?._id == message.senderId &&
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
      />
    </Box>
  );
};

export default AllMessages;
