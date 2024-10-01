/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { Alert, Box, CardMedia, ToggleButton } from "@mui/material";
import Footer from "../navbars/Footer";
import SelfMessage from "./SelfMessage";
import SenderMessage from "./SenderMessage";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";

const server_url = process.env.REACT_APP_SERVER_URL;
const socket = io(server_url);

const AllMessages = ({ person, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState();
  const [file, setFile] = useState();
  const [audio, setAudio] = useState();
  const [image, setImage] = useState();
  const [activeUsers, setActiveUsers] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser?.user);
  const scrollRef = useRef();

  const sendMessage = async () => {
    let message = {};
    if (!file) {
      message = {
        senderId: currentUser?._id,
        receiverId: person?._id,
        conversationId: conversation?._id,
        type: "text",
        text: value,
      };
    } else {
      // const base64File = await convertFileToBase64(file);
      // console.log(base64File);
      const type = file.split(".");
      let fileType = await getFileType(type[type?.length - 1]);
      message = {
        senderId: currentUser?._id,
        receiverId: person?._id,
        conversationId: conversation?._id,
        type: fileType,
        text: file,
      };
    }
    // alert(JSON.stringify(message))
    socket.emit("sendMessage", message);
    setValue("");
    setFile();
    setImage("");
  };
  const getFileType = (extension) => {
    const documentExtensions = [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "txt",
    ];
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    const videoExtensions = ["mp4", "mkv", "webm", "avi", "mov", "wmv"];
    const audioExtensions = ["mp3", "wav", "ogg", "flac", "aac"];

    if (documentExtensions.includes(extension)) {
      return "application";
    } else if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else if (audioExtensions.includes(extension)) {
      return "audio";
    } else {
      return "text";
    }
  };
  const sendVoiceMessage = async (voice, fileType) => {
    const message = {
      senderId: currentUser?._id,
      receiverId: person?._id,
      conversationId: conversation?._id,
      type: fileType,
      text: voice,
    };
    socket.emit("sendMessage", message);
  };
  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;
    if (code === 13) {
      sendMessage();
    }
  };
  const getMessages = async () => {
    setMessages([]);
    await fetch(`${server_url}/api/message/get/${conversation?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(person?.name);
        console.log(data);
        if (data.length > 0) {
          setMessages(data);
        } else {
          setMessages([]);
        }
      });
  };
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleReset = () => {
    // setOpen(false);
    setValue("");
    setFile(null);
    setAudio(null);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleReset();
    }
  };
  useEffect(() => {
    socket.on("newMessage", (data) => {
      setIncomingMessage({
        ...data.message,
        createdAt: Date.now(),
      });
    });
    return () => {
      socket.off("newMessage");
    };
  }, [conversation]);
  useEffect(() => {
    if (conversation?._id) {
      socket.emit("joinConversation", conversation?._id);
    }
  }, [conversation]);
  useEffect(() => {
    getMessages();
  }, [conversation]);
  useEffect(() => {
    socket.on("receiveConversation", (data) => {
      socket.emit("getMessages", data?._id);
    });
    socket.on("getMessage", (data) => {
      if (data[0]?.conversationId === conversation?._id) {
        console.log(data);
        setMessages((prev) => data);
        setValue("");
        setFile();
        setImage("");
      } else {
        console.log("not in the conversation");
        setMessages([]);
        setValue("");
        setFile();
        setImage("");
        setIncomingMessage(null);
      }
    });
    return () => {
      socket.off("receiveConversation");
      socket.off("getMessage");
    };
  }, [conversation]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);
  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);
  useEffect(() => {
    socket.emit("userOnline", currentUser._id);

    socket.on("updateUserStatus", ({ onlineUsers }) => {
      setActiveUsers(onlineUsers);
      if (Object.keys(onlineUsers).includes(person?._id)) {
        fetch("http://localhost:3001/api/message/update-delivered", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiverId: currentUser?._id,
            senderId: person?._id,
          }),
        });
      }
    });
  }, [person]);
  return (
    <Box
      sx={{
        backgroundImage: `url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"})`,
        backgroundSize: "70%",
      }}
      onKeyDown={handleKeyDown}
    >
      <Box sx={{ height: "79vh", overflowY: "scroll" }}>
        {messages &&
          messages.length > 0 &&
          messages.map((message, i) => (
            // message.senderId === person?._id && message.status === 'seen' &&
            <Box sx={{ padding: "1px 80px" }} key={i} ref={scrollRef}>
              {person?._id == message.senderId ? (
                <SenderMessage message={message} />
              ) : (
                <SelfMessage message={message} />
              )}
            </Box>
          ))}
        {/* {messages[messages.length - 1].status !== 'seen' && <Alert>new messages</Alert>}
        {messages && messages.length > 0 &&
          messages.map((message, i) => (
            (message.status !== 'seen' || message.senderId === person?._id) && <Box
              sx={{ padding: "1px 80px" }}
              key={i}
              ref={scrollRef}
            >
              {person?._id == message.senderId ?
                <SenderMessage message={message} /> :
                <SelfMessage message={message} />
              }
            </Box>
          ))} */}
      </Box>
      {file && (
        <div className="aspect-square bg-[#dcf8c6] p-2 ml-4 z-50 absolute bottom-1 rounded-md">
          <CardMedia
            component="img"
            // width={300}
            // height={300}
            image={server_url + file}
            alt="media not available"
            sx={{
              background: "linear-gradient(to top, #cccccc 0%, #ffffff 100%)",
              width: 400,
              height: 400,
              objectFit: "cover",
            }}
          />
          <ToggleButton
          sx={{ position: 'absolute'}}
          icon={<SendIcon />}
          onClick={() => sendMessage()}
          variant={"icon"}
        />
        </div>
      )}
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setAudio={setAudio}
        setImage={setImage}
        sendMessage={sendMessage}
        sendVoiceMessage={sendVoiceMessage}
      />
    </Box>
  );
};

export default AllMessages;
