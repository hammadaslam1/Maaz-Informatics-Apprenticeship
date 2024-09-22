import { Box, Divider, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
const EmptyChat = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ForumIcon sx={{ color: "#00a884", fontSize: "200px" }} />
        <Typography
          sx={{
            fontSize: "32px",
            fontFamily: "inherit",
            fontWeight: 500,
            color: "#41525d",
            marginTop: "25px 0 10px 0",
          }}
        >
          WhatsApp Web
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#667781",
            fontWeight: 600,
            fontFamily: "inherit",
          }}
        >
          Now send and receive messages without keeping your phone online.
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#667781",
            fontWeight: 600,
            fontFamily: "inherit",
          }}
        >
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.{" "}
        </Typography>
        <Divider sx={{ margin: "40px 0", opacity: "0.4" }} />
      </Box>
    </Box>
  );
};

export default EmptyChat;
