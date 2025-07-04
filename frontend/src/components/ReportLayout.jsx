import React from "react";
import ViewTickets from "../pages/ViewTickets";
import "../pages/ReportIssue.css";

export default function ReportLayout({ children, onEdit }) {
  return (
    <div className="two-panel">
      <div className="left-panel">
        {children}
      </div>
      <div className="right-panel">
        <ViewTickets onEdit={onEdit} />
      </div>
    </div>
  );
}
