import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessLoginMessage from "../components/SuccessLoginMessage";
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(""); // <-- error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // reset error before trying

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setLoginSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else if (response.status === 401) {
        setLoginError("Invalid username or password.");
      } else {
        setLoginError("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Network error. Please try again later.");
    }
  };

  const goToRegister = () => navigate("/register");

  return loginSuccess ? (
    <SuccessLoginMessage username={username} />
  ) : (
    <div className="login-wrapper">
      <div className="login-card">
        <img src="/campus-logo.png" alt="Campus Connect Logo" className="login-logo" />

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

          {/* 🔴 Error Message */}
          {loginError && <div className="login-error">{loginError}</div>}

          <div className="login-links">
            <span className="register-link" onClick={goToRegister}>Register</span>
            <button type="submit" className="login-button">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
