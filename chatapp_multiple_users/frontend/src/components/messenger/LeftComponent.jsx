/* eslint-disable no-unused-vars */
import { Box, Divider } from "@mui/material";
import AllChatsHeader from "../navbars/AllChatsHeader";
import { useEffect, useState } from "react";
import ConversationButton from "../buttons/ConversationButton";

import { useSelector, useDispatch } from "react-redux";
const LeftComponent = ({ users }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [conversation, setConversation] = useState(null);
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: "calc(100vh - 30px)", width: "100%" }}>
        <AllChatsHeader />
        <Box sx={{ overflowY: "auto", height: "77vh" }}>
          {users &&
            users.length > 0 &&
            users
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              .map(
                (user, i) =>
                  user?._id !== currentUser?.user?._id && (
                    <div key={i}>
                      <ConversationButton user={user} me={currentUser?.user} />
                      {users.length !== i + 1 && (
                        <Divider
                          sx={{
                            margin: "0 0 0 70px",
                            backgroundColor: "#e9edef",
                            opacity: "0.6",
                          }}
                        />
                      )}
                    </div>
                  )
              )}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftComponent;
