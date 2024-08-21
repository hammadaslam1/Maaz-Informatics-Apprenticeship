import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { MAINPAGE } from "./Routes";

const MainRoute = () => {
  const { loggedIn } = useSelector((state) => state.user);
  // alert(JSON.stringify(loggedIn));
  return !loggedIn ? <Outlet /> : <Navigate to={MAINPAGE} />;
};

export default MainRoute;
