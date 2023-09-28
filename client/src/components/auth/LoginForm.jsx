import React from "react";
import { NavLink } from "react-router-dom";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputBox">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="inputBox">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
      </div>
      <div className="links">
        <NavLink to="/forgotpassword">Forgot Password</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>
      <div className="inputBox">
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
