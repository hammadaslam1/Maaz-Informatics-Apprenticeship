import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatbox from "../pages/Chatbox";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Chatbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
