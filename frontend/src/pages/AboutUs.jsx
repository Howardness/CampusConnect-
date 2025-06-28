// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-wrapper">
      {/* Logo Header */}
      <div className="about-header">
        <img src="/campus-logo.png" alt="Campus Connect Logo" className="about-logo" />
      </div>

      {/* Main Content */}
      <h2>
        📘 About <span className="highlight">Campus Connect</span>
      </h2>

      <p>
        <strong>CampusConnect</strong> is a smart and user-friendly mobile/web platform built for schools to simplify student–staff support.
      </p>
      <p>
        💡 Students can report technical issues, track support tickets, and schedule appointments with departments such as IT, Registrar, or Counseling.
      </p>
      <p>
        👨‍🏫 Staff use a dashboard to efficiently manage support requests and help students quickly and clearly.
      </p>
      <p className="mission">
        🎯 Our mission: To provide timely, efficient, and easy-to-use support for every student.
      </p>

      <Link to="/dashboard" className="back-button">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

