import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MESSENGER, LOGIN, REGISTER } from "./Routes";
import ChatDialog from "../pages/ChatDialog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Messenger from "../pages/Messenger";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={MESSENGER} element={<Messenger />} />
        <Route exact path={LOGIN} element={<Login />} />
        <Route exact path={REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
