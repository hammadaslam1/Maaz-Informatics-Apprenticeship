import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { ADDADDRESS, ADDSTUDENT, HOME } from "./Routes";
import AddStudent from "../pages/AddStudent";
import AddAddress from "../pages/AddAddress";
import Navbar from "../components/bars/Navbar";

const Navigations = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route exact path={HOME} element={<Home />} />
        <Route path={ADDSTUDENT} element={<AddStudent />} />
        <Route path={ADDADDRESS} element={<AddAddress />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
