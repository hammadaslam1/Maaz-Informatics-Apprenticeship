import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { HOME, LOGIN, MAINPAGE, REGISTER } from "./Routes";
import { useSelector } from "react-redux";
import MainPage from "../screens/MainPage";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={MAINPAGE} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
