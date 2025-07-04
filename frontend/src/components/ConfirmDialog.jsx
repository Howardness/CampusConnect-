import React from "react";
import "./ConfirmDialog.css";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-buttons">
          <button type="button" className="confirm" onClick={onConfirm}>✅</button>
        <button type="button" className="cancel" onClick={onCancel}>❌</button>
        </div>
      </div>
    </div>
  );
}
