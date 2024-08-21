import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { MAINPAGE } from "./Routes";

const MainRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return !currentUser ? <Outlet /> : <Navigate to={MAINPAGE} />;
};

export default MainRoute;
