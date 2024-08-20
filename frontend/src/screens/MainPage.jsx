import { Button } from "@mui/material";
import { LOGIN } from "../router/Routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MainPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignout = async () => {
    // alert('clicked')
    try {
      await fetch("http://localhost:3002/api/auth/signout", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          //   if (response.status == 200) {
          alert(response.status.toString());
          navigate(LOGIN);
          //   }
        })
        .catch(() => {
          alert("signout failed");
        });
    } catch (error) {
      alert("some problem");
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to Maaz Informatics</h1>
      <h2>This is the main page.</h2>
      <h3>This is a test.</h3>
      <Button variant="contained" color="error" onClick={handleSignout}>
        Logout
      </Button>
    </div>
  );
};

export default MainPage;
