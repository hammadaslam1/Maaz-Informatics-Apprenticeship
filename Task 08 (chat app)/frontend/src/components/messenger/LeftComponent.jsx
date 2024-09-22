import { Box, Divider } from "@mui/material";
import AllChatsHeader from "../navbars/AllChatsHeader";
import { useState } from "react";
import ConversationButton from "../buttons/ConversationButton";
const LeftComponent = () => {
  const [users, setUsers] = useState([0]);
  return (
    <Box>
      <Box sx={{ height: "110px" }}>
        <AllChatsHeader />
        <Box sx={{ overflow: "overlay", height: "81vh" }}>
          {users &&
            users.map(
              (user, i) =>
                user._id !== "my own _id" && (
                  <>
                    <ConversationButton user={user} />
                    {users.length !== i + 1 && (
                      <Divider
                        sx={{
                          margin: "0 0 0 70px",
                          backgroundColor: "#e9edef",
                          opacity: "0.6",
                        }}
                      />
                    )}
                  </>
                )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftComponent;
