import React from "react";

export default function SuccessMessage({ editingTicket, resetForm, handleBack }) {
  return (
    <div className="success-card">
      <div className="success-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </div>
      <h2>{editingTicket ? "Ticket Updated Successfully!" : "Issue Reported Successfully!"}</h2>
      <p>Your ticket has been {editingTicket ? "updated" : "created"} and processed.</p>
      {!editingTicket && (
        <button onClick={resetForm} className="success-button">Report Another Issue</button>
      )}
      <button onClick={handleBack} className="back-button">← Back</button>
    </div>
  );
}
