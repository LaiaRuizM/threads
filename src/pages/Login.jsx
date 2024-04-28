import { Link } from "react-router-dom";
import { useRef } from "react";

const Login = () => {
  const loginForm = useRef(null);
  return (
    <div className="container mx-auto max-w-[400px] rounded-md border border-[rgba(49,49,50,1)] p-4">
      <form action="" ref={loginForm}>
        <div className="py-2">
          <label htmlFor="">Email:</label>
          <input
            required
            type="email"
            name="email"
            className="w-full p-2 rounded-sm"
          />
        </div>
        <div className="py-2">
          <label htmlFor="">Password:</label>
          <input
            required
            type="password"
            name="password"
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
        Don&apos;t have an account? <Link to="/register">Registrer</Link>
      </p>
    </div>
  );
};

export default Login;
