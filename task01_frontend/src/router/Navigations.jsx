import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { ADDNEW, BLOG, HOME, LOGIN, MAINPAGE, REGISTER } from "./Routes";
import { useSelector } from "react-redux";
import MainPage from "../screens/MainPage";
import PrivateRoute from "./PrivateRoute";
import MainRoute from "./MainRoute";
import Appbar from "../components/navbar/Appbar";
import AddNew from "../screens/AddNew";
import Blog from "../screens/Blog";

const Navigations = () => {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {loggedIn && <Appbar />}
      <Routes>
        <Route element={<MainRoute />}>
          <Route exact path={HOME} element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path={MAINPAGE} element={<MainPage />} />
          <Route path={ADDNEW} element={<AddNew />} />
          <Route path={BLOG} element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
