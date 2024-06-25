import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const registerForm = useRef(null);
  const { user, registerUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if (password1 !== password2) {
      alert("Passwords do not match!");
      return;
    }

    const userInfo = { name, email, password1, password2 };
    registerUser(userInfo);
  };

  return (
    <div className="container mx-auto max-w-[400px] rounded-md border border-[rgba(49,49,50,1)] p-4">
      <form ref={registerForm} onSubmit={handleSubmit}>
        <div className="py-2">
          <label>Name:</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter name..."
            className="w-full p-2 rounded-sm"
          />
        </div>

        <div className="py-2">
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter email..."
            className="w-full p-2 rounded-sm"
          />
        </div>

        <div className="py-2">
          <label>Password:</label>
          <input
            type="password"
            name="password1"
            placeholder="Enter password..."
            className="w-full p-2 rounded-sm"
          />
        </div>

        <div className="py-2">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm password..."
            className="w-full p-2 rounded-sm"
          />
        </div>

        <div className="py-2">
          <input type="submit" value="Register" className="btn" />
        </div>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
