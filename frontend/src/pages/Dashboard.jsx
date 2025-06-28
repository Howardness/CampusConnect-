// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ViewTickets from "./ViewTickets";
import './Dashboard.css';

export default function Dashboard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="dashboard-wrapper">
      {/* LEFT SIDE */}
      <div className="dashboard-left">
        <div className="dashboard-logo">
          <img src="/campus-logo.png" alt="Campus Connect Logo" />
        </div>

        <div className="dashboard-nav">
          <Link
            to="/report-issue"
            className="dashboard-button red"
            onMouseEnter={() => setHovered("issue")}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === "issue" ? "Create" : "Report an Issue"}
          </Link>
        
          <Link
            to="/schedule-appointment"
            className="dashboard-button green"
            onMouseEnter={() => setHovered("appointment")}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === "appointment" ? "Create" : "Schedule Appointment"}
          </Link>

          <Link
            to="/about-us"
            className="dashboard-button info"
            onMouseEnter={() => setHovered("about")}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === "about" ? "Info" : "About Us"}
          </Link>
          <Link
        to="/"
         className="dashboard-button logout"
        style={{ marginTop: "auto" }}
        >
         Log Out
        </Link>
        </div>

        {/* 🐾 Bouncing Mascot */}
        <div className="bouncing-mascot">
          <img src="/mascot.png" alt="Mascot" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="dashboard-right">
        <ViewTickets />
      </div>
    </div>
  );
}
