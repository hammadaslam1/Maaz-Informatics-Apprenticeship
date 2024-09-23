/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { Box } from "@mui/material";
import Footer from "../navbars/Footer";
import SelfMessage from "./SelfMessage";
import SenderMessage from "./SenderMessage";
import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client';


const socket = io('http://localhost:3001');

const AllMessages = ({ person, conversationId, receiver, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const scrollRef = useRef();

  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;

    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: person._id,
          receiverId: receiver._id,
          conversationId: conversationId,
          type: 'text',
          text: value
        };
      } else {
        message = {
          senderId: person._id,
          receiverId: receiver._id,
          conversationId: conversationId,
          type: 'media',
          text: image
        };
      }

      socket.emit('sendMessage', message);

      fetch('http://localhost:3001/api/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }).then((response) => {
        if (!response.ok) throw new Error("Failed to send message");
        return response.json();
      }).then((data) => alert(data)).catch((err) => {
        alert(err);
      })

      setValue('');
      setFile();
      setImage('');
      // setNewMessageFlag(prev => !prev);
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
  const getMessageDetails = async () => {
    fetch(`http://localhost:3001/api/message/get/${conversation._id}`, {
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
    getMessageDetails();
  }, [conversation?._id, person._id]);
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
        backgroundSize: "50%",
      }}
    >
      <Box sx={{ height: "77vh", overflowY: "scroll" }}>
        {messages &&
          messages.map((message) => (
            <Box
              sx={{ padding: "1px 80px" }}
              ref={scrollRef}
            >
              <SelfMessage message={message} />
              <SenderMessage message={message} />
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
