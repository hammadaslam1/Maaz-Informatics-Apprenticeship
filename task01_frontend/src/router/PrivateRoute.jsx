import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "./Routes";

const PrivateRoute = () => {
  const {loggedIn} = useSelector((state) => state.user);
  return loggedIn ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default PrivateRoute;
