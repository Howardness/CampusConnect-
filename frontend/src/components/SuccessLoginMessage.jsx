import React from "react";
import "./SuccessLoginMessage.css";

export default function SuccessLoginMessage({ username }) {
  return (
    <div className="success-login-container">
      <div className="success-card">
        <div className="checkmark-icon">
          ✅
        </div>
        <h2>Welcome, {username}!</h2>
        <p>Login successful. Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
