import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HOME } from "./Routes";
import Home from "../pages/Home";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
