import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  return (
    <div className="text-center">
      {user ? (
        <div>
          <strong>Hello {user.name}</strong>
          <button
            onClick={logoutUser}
            className="bg-white text-black py-2 px-4 border text-sm border-black rounded cursor-pointer">
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-white text-black py-2 px-4 border text-sm border-black rounded cursor-pointer">
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
