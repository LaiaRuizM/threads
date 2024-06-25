import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoutes = () => {
  const { user } = useAuth(); // = const user = false; --> avoids enter to Threads without a previous login.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  user: PropTypes.string,
};

export default PrivateRoutes;

//Outlet: child component
