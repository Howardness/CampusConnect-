import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/dashboard");
    } else if (response.status === 401) {
      alert("Invalid username or password");
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
};

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img
          src="/campus-logo.png"
          alt="Campus Connect Logo"
          className="login-logo"
        />
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <div className="login-links">
            <span className="register-link" onClick={goToRegister}>
              Register
            </span>
            <button type="submit" className="login-button">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
