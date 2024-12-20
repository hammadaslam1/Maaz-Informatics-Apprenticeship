import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return !currentUser ? <Outlet /> : <Navigate to={"/"} />;
};

export default MainRoute;
