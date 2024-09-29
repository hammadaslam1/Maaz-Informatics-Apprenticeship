/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signinSuccess,
  signoutSuccess,
} from "../redux/userReducer/UserReducer";

const server_url = process.env.REACT_APP_SERVER_URL
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleLogin = async () => {
    await fetch(`${server_url}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        dispatch(signinSuccess(data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="p-8 gap-2 w-[500px] bg-white rounded-lg flex flex-col">
        <h1 className="text-3xl mb-8 text-center font-bold text-gray-800">
          Login
        </h1>
        <input
          className="border p-3 my-1 px-5 rounded-md"
          placeholder="Email Address"
          type="email"
          name="email"
          onChange={handleInputChange}
        />
        <input
          className="border p-3 my-1 px-5 rounded-md"
          placeholder="password"
          type="password"
          name="password"
          onChange={handleInputChange}
        />
        <button
          className="p-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 transition-all text-white text-xl font-bold rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-500">Not registered yet?</span>
          <button
            className="ml-2 text-gray-600 text-base font-bold"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;