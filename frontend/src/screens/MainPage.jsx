import { Button } from "@mui/material";
import { HOME, LOGIN } from "../router/Routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../redux/userReducer/UserReducer";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      await fetch("http://localhost:3002/api/auth/signout", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setLoggedOut());
            navigate(LOGIN);
          }
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
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate(HOME)}
      >
        Home
      </Button>
      <h1>Welcome to Maaz Informatics</h1>
      <h2>This is the main page.</h2>
      <h3>This is a test.</h3>
    </div>
  );
};

export default MainPage;
