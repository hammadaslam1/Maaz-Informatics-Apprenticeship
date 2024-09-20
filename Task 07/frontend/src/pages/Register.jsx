import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleRegister = () => {
    alert(JSON.stringify(form));
  };
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="p-8 gap-2 w-[500px] bg-white rounded-lg flex flex-col">
        <h1 className="text-3xl mb-8 text-center font-bold text-gray-800">
          Register
        </h1>
        <input
          className="border p-3 my-1 px-5 rounded-md"
          placeholder="Full Name"
          type="text"
          name="name"
          onChange={handleInputChange}
        />
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
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-500">Already Registered?</span>
          <button
            className="ml-2 text-gray-600 text-base font-bold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
