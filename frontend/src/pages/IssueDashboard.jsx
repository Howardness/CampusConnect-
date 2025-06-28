import React from "react";
import ReportIssue from "./ReportIssue";
import ViewTickets from "./ViewTickets";
import './IssueDashboard.css'; // you can also merge CSS here

export default function IssueDashboard() {
  return (
    <div className="issue-dashboard">
      <div className="left-pane">
        <ReportIssue />
      </div>
      <div className="right-pane">
        <ViewTickets />
      </div>
    </div>
  );
}
