import { Link } from "react-router-dom";
// import { useRef } from "react";

const Login = () => {
  //   const loginForm = useRef(null);
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="">Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="">Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" name="Login" />
        </div>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register" />
      </p>
    </div>
  );
};

export default Login;
