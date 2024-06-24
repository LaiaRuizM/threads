import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container mx-auto max-w-[400px] rounded-md border border-[rgba(49,49,50,1)] p-4">
      <form>
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
