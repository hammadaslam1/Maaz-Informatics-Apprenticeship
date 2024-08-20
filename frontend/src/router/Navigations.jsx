import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { HOME, LOGIN, REGISTER } from "./Routes";
import { useSelector } from "react-redux";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
