import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="text-center">
      {user ? (
        <div>
          <strong>Hello {user.name}</strong>
        </div>
      ) : (
        <button className="bg-white text-black py-2 px-4 border text-sm border-black rounded cursor-pointer">
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
