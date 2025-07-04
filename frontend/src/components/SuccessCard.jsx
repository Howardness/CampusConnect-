import React from "react";

export default function SuccessCard({ editingAppt, resetForm, handleBack }) {
  return (
    <div className="report-container">
      <div className="drawer open">
        <div className="report-wrapper">
          <div className="success-card">
            <div className="success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
            <h2>
              {editingAppt ? "Appointment Updated Successfully!" : "Appointment Scheduled Successfully!"}
            </h2>
            <p>
              Your appointment has been {editingAppt ? "updated" : "scheduled"} and processed.
            </p>
            {!editingAppt && (
              <button onClick={resetForm} className="success-button">
                Schedule Another Appointment
              </button>
            )}
            <button onClick={handleBack} className="back-button">← Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
