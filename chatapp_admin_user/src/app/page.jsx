"use client";
import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-[#cecfc7] flex justify-center items-center">
      {/* <div className="rounded-3xl bg-cyan-50 p-7 shadow-2xl flex flex-col items-center gap-6">
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
      </div> */}
      <LoginForm />
    </div>
  );
}
