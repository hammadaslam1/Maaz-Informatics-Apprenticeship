import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { MAINPAGE } from "./Routes";

const MainRoute = () => {
  const { loggedIn } = useSelector((state) => state.user);
  return !loggedIn ? <Outlet /> : <Navigate to={MAINPAGE} />;
};

export default MainRoute;
