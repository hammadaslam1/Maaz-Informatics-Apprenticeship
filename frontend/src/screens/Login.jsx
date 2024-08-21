/* eslint-disable eqeqeq */
import { Box, Button, Card, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoggedIn,
  signinFailure,
  signinSuccess,
  userNotFound,
} from "../redux/userReducer/UserReducer";
import { replace, useNavigate } from "react-router-dom";
import { HOME, MAINPAGE, REGISTER } from "../router/Routes";
import { Alert } from "@mui/joy";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      if (email == "" || password == "") {
        return setError("Please fill out all fields");
      } else if (!emailRegex.test(email)) {
        return setError("invalid email");
      } else if (password == "") {
        return setError("Please enter your password");
      }
      fetch("http://localhost:3002/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          // alert(JSON.stringify(response));
          if (response.status == 200) {
            dispatch(setLoggedIn());
            dispatch(signinSuccess(response.json()));
            navigate(MAINPAGE);
          } else if (response.status == 401) {
            dispatch(userNotFound());
            navigate(REGISTER);
          } else if (response.status == 400) {
            dispatch(signinFailure());
            setError("Invalid Password");
          } else if (response.status == 500) {
            dispatch(signinFailure());
            setError("Server Error");
          }
        })
        .catch((error) => {
          dispatch(signinFailure());
          setError(error.message);
        });
    } catch {
      setError("signin failed");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{ display: "flex", flexDirection: "column", width: "400px", p: 5 }}
        elevation={5}
      >
        <h1>Login Page</h1>
        <TextField
          variant="outlined"
          type="text"
          value={email}
          onChange={(e) => {
            setError(null);
            setEmail(e.target.value);
          }}
          placeholder="Email Address"
          sx={{ mx: 2, my: 1 }}
          label="Email"
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => {
            setError(null);
            setPassword(e.target.value);
          }}
          placeholder="Password"
          variant="outlined"
          label="Password"
          sx={{ mx: 2, my: 1 }}
        />
        {error && (
          <Alert
            variant="plain"
            color="danger"
            sx={{ textAlign: "center", p: 0, mx: 3 }}
          >
            {error}
          </Alert>
        )}
        <Button variant="contained" onClick={handleSignin} sx={{ m: 2 }}>
          Sign in
        </Button>
        <div
          style={{ padding: "1px", backgroundColor: "#c4c4c4", marginTop: 10 }}
        ></div>
        <Typography variant="caption" sx={{ mt: 4 }}>
          <span>Not Registered?</span>{" "}
          <Button
            variant="outlined"
            onClick={() => navigate(REGISTER, { state: false })}
          >
            Register
          </Button>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;
