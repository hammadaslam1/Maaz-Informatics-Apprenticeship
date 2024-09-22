import { Box } from "@mui/material";
import Footer from "../navbars/Footer";
import SelfMessage from "./SelfMessage";
import SenderMessage from "./SenderMessage";

const AllMessages = ({ messages }) => {
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
              // ref={scrollRef}
            >
              <SelfMessage message={message} />
              <SenderMessage message={message} />
            </Box>
          ))}
      </Box>
      <Footer
      // sendText={sendText}
      // value={value}
      // setValue={setValue}
      // setFile={setFile}
      // file={file}
      // setImage={setImage}
      />
    </Box>
  );
};

export default AllMessages;
