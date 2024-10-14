/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOtherUsers,
  signinSuccess,
} from "../../../lib/redux/userSlice/UserReducer";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogin = () => {
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          dispatch(signinSuccess(data?.user));
          dispatch(setOtherUsers(data?.otherUsers));
          router.replace("/chat");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/chat");
    }
  }, []);
  return (
    <div className="rounded-3xl bg-[#eff8e2] p-7 shadow-2xl flex flex-col items-center gap-6">
      <h1 className="text-[#23022e] text-3xl font-semibold">Login</h1>
      <div className="min-w-96 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          disableElevation
          sx={{
            textTransform: "capitalize",
            color: "#23022e",
            bgcolor: "#cecfc7",
            "&:hover": {
              backgroundColor: "#23022e",
              color: "#eff8e2",
              cursor: "pointer",
            },
          }}
          className="w-full my-3 px-5 py-3 transition-all capitalize"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
