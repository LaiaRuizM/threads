import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { user, logoutUser } = useAuth();
  return (
    <div className="flex items-center justify-between py-8 px-4">
      <div className="flex items-center justify-start w-1/3">
        <Link to={"/"}>
          <strong className="text-4xl text-white">@</strong>
        </Link>
      </div>

      <div className="flex justify-center w-1/3">
        <UserDropdown />
      </div>

      <div className="flex items-center justify-end w-1/3">
        {user ? (
          <div className="flex items-center justify-center gap-4">
            <Link to={`/profile/${user?.profile.username}`}>
              <img
                className="h-6 w-6 object-cover rounded-full"
                src={user.profile.profile_pic}
              />
            </Link>
            <p>Hello {user.name}!</p>
            <button
              onClick={logoutUser}
              className="bg-white text-black text-xs py-1 px-2 border border-black rounded cursor-pointer">
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
    </div>
  );
};

Header.propTypes = {
  profile_pic: PropTypes.func,
  username: PropTypes.string,
};

export default Header;
