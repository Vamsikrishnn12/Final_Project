import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:npxhaH22/auth/login",
        { email, password }
      );

      // Check if token is received
      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
        alert("Login successful!");

        // Notify other components about login state change
        window.dispatchEvent(new Event("authChange"));

        navigate("/"); // Redirect to home page
      } else {
        setError("Invalid credentials. Please try again.");
      }
      
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <p className="description">Join LifelineConnect and make a difference!</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
