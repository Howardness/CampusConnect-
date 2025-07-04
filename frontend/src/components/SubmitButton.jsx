import React from "react";
import "./SubmitButton.css"; 

export default function SubmitButton({ isSubmitting, editing, label }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`submit-button ${isSubmitting ? "loading" : ""}`}
    >
      {isSubmitting
        ? "Submitting..."
        : editing
        ? `Update ${label}`
        : `Submit ${label}`}
    </button>
  );
}
