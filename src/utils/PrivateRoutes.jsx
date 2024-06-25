import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth(); // = const user = false; -> avoids enter to Threads without a previous login.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

//Outlet: child component
