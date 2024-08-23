/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  Card,
  Box,
  Typography,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME, LOGIN, MAINPAGE } from "../router/Routes";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../redux/userReducer/UserReducer";
import {Alert} from '@mui/joy'

const Register = () => {
  const navigate = useNavigate();
  const { isTried, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      navigate(MAINPAGE);
    } else if (!isTried) {
      navigate(LOGIN);
    }
  }, [isTried, loggedIn]);
  const handleRegister = async () => {
    try {
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      if (
        password == "" ||
        email == "" ||
        name == "" ||
        confirmPassword == ""
      ) {
        return setError("Enter all fields");
      } else if (password != confirmPassword) {
        return setError("Passwords do not match");
      }
      if (!emailRegex.test(email)) {
        return setError("invalid email");
      }
      fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }).then((response) => {
        if (response.status === 200) {
          dispatch(setLoggedIn());
          navigate(MAINPAGE);
        } else if (response.status === 409) {
          return setError("Email Already In-Use");
        } else {
          setError("Signup failed");
        }
      });
    } catch {
      return setError("Sign Up Failed");
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
        <h1>Register Page</h1>
        <TextField
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => {
            setError(null);
            setName(e.target.value);
          }}
          placeholder="Full Name"
          sx={{ mx: 2, my: 1 }}
          label="Full Name"
        />
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
          sx={{ mx: 2, my: 1 }}
          label="Password"
        />
        <TextField
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setError(null);
            setConfirmPassword(e.target.value);
          }}
          placeholder="Confirm Password"
          variant="outlined"
          sx={{ mx: 2, my: 1 }}
          label="Confirm Password"
        />
        {error && (
          <Alert variant="plain" color="danger" sx={{ textAlign: "center", p:0, mx:3 }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" onClick={handleRegister} sx={{ m: 2 }}>
          Register
        </Button>
        <div
          style={{ padding: "1px", backgroundColor: "#c4c4c4", marginTop: 10 }}
        ></div>
        <Typography variant="body1" fontWeight={500} fontStyle={'italic'} sx={{ mt: 4 }}>
          <span>Already Registered?</span>{" "}
          <Button variant="outlined" onClick={() => navigate(LOGIN)}>
            Login
          </Button>
        </Typography>
      </Card>
    </div>
  );
};

export default Register;
