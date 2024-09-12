import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Navigations = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        {/* <Route path="/about" component={About} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Navigations;
