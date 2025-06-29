// src/components/CombinedView.jsx
import React from "react";
import ViewTickets from "../pages/ViewTickets";
import ViewAppointments from "../pages/ViewAppointments";
import "./CombinedView.css";

export default function CombinedView() {
  return (
    <div className="combined-view">
      {/* Reported Tickets */}
      <div className="combined-column">
       
        <ViewTickets />
      </div>

      {/* Scheduled Appointments */}
      <div className="combined-column">
        <ViewAppointments />
      </div>
    </div>
  );
}
