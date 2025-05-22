import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

function Registeration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:npxhaH22/auth/signup", // Replace with your actual Xano API endpoint
        formData
      );

      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken); // Store the token for future requests
        alert("Registration successful!");
        navigate("/Login"); // Redirect to dashboard or login page
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data.message || "Registration failed!");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <p className="description">Join LifelineConnect and make a difference!</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Registeration;
