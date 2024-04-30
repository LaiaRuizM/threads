import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  return (
    <div>
      {user ? (
        <div className="flex items-center justify-center gap-2 py-2">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={user.profile.profile_pic}
          />
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
