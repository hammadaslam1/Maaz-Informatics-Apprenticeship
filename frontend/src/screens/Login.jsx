/* eslint-disable eqeqeq */
import {
  Alert,
  Box,
  Button,
  Card,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinSuccess } from "../redux/userReducer/UserReducer";
import { replace, useNavigate } from "react-router-dom";
import { HOME, MAINPAGE, REGISTER } from "../router/Routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
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
          if (response.status == 200) {
            return response.json();
          } else {
            navigate(REGISTER, { state: true });
          }
        })
        .then((data) => {
          if (data) {
            dispatch(signinSuccess(data));
            navigate(MAINPAGE);
          }
        })
        .catch((error) => {
          dispatch(signinFailure());
          setError(error.message);
          navigate(REGISTER, { state: true });
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
          sx={{ mx: 2, my: 1 }}
        />
        {error && (
          <Alert variant="solid" color="danger" sx={{ textAlign: "center" }}>
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
