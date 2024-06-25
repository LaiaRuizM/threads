import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const loginForm = useRef(null);
  const { loginUser, user } = useAuth();

  const navigate = useNavigate(); // Allow us to redirect the user

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    // const userInfo = { email, password }; loginUser(userInfo); -> We can mix them and put it as:
    loginUser({ email, password });
    navigate("/");
  };
  return (
    <div className="container mx-auto max-w-[400px] rounded-md border border-[rgba(49,49,50,1)] p-4">
      <form action="" onSubmit={handleSubmit} ref={loginForm}>
        <div className="py-2">
          <label htmlFor="">Email:</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter email..."
            className="w-full p-2 rounded-sm"
          />
        </div>
        <div className="py-2">
          <label htmlFor="">Password:</label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter password..."
            className="w-full p-2 rounded-sm"
          />
        </div>
        <div className="py-2">
          <input
            type="submit"
            name="Login"
            className="bg-white text-black py-2 px-4 border text-sm border-black rounded cursor-pointer"
          />
        </div>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
