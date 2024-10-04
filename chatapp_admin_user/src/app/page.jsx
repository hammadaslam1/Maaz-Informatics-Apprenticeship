"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigation = (path) => {
    router.push(path);
  };
  const handleTest = async () => {
    await fetch("/api/users/login", {
      method: "GET",
    }).then((response) => console.log(response));
  };
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
        if (data.success) {
          router.push("/chat");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="min-h-screen bg-cyan-200 flex justify-center items-center">
      <div className="rounded-3xl bg-cyan-50 p-7 shadow-2xl flex flex-col items-center gap-6">
        <h1 className="text-cyan-900 text-3xl font-semibold">Login</h1>
        <div className="min-w-96 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-cyan-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full my-3 px-5 py-3 transition-all text-white bg-cyan-400 rounded-md hover:bg-cyan-500 active:bg-cyan-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
