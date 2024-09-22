import { Box, Divider } from "@mui/material";
import AllChatsHeader from "../navbars/AllChatsHeader";
import { useEffect, useState } from "react";
import ConversationButton from "../buttons/ConversationButton";
const LeftComponent = () => {
  const [users, setUsers] = useState(null);
  const fetchAllUsers = async () => {
    fetch("http://localhost:3001/api/user/getallusers")
      .then((response) => {
        if (response.status === 200) {
          return response.json(); // Return the promise here
        } else {
          throw new Error("Failed to fetch users");
        }
      })
      .then((data) => {
        console.log(data);
        setUsers(data); // Now `data` is the parsed JSON
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
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
