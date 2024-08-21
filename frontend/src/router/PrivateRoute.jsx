import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "./Routes";

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return currentUser ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default PrivateRoute;
