/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  Card,
  Box,
  Typography,
  DialogActions,
  Button,
  Alert,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME, LOGIN, MAINPAGE } from "../router/Routes";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTried, setIsTried] = useState(true);
  //   alert(isTried)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsTried((prev) => location.state.isTried);
    if (!isTried) {
      navigate(LOGIN);
    }
  }, [location.state?.isTried]);
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
        console.log(response);
        if (response.ok) {
          navigate(MAINPAGE);
        } else {
          return setError("signup failed");
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
        />
        {error && (
          <Alert variant="solid" color="danger" sx={{ textAlign: "center" }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" onClick={handleRegister} sx={{ m: 2 }}>
          Register
        </Button>
        <div
          style={{ padding: "1px", backgroundColor: "#c4c4c4", marginTop: 10 }}
        ></div>
        <Typography variant="caption" sx={{ mt: 4 }}>
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
