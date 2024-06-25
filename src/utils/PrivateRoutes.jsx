import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoutes = () => {
  const { user } = useAuth(); // Custom hook in AuthContext, now this destructuring acts as a false as in => const user = false; --> avoids enter to Threads without a previous login. Destructuring 'user' from the object returned by 'useAuth'
  return user ? <Outlet /> : <Navigate to="/login" />; // If 'user' is authenticated, renders the Outlet component (the child routes). If 'user' is not available, redirect the user to the login page.
};

PrivateRoutes.propTypes = {
  user: PropTypes.string,
};

export default PrivateRoutes;

//Outlet: child component; it renders the child routes of the parent route.
