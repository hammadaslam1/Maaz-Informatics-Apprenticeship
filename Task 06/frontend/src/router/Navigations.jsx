import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOME } from "./Routes";
import Home from "../pages/Home";

const Navigations = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route exact path={HOME} element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Navigations;
