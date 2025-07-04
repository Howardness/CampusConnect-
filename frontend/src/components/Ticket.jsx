import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog"; 

export default function Ticket({ ticket, index, onDelete }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    navigate("/report", { state: { ticket } });
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onDelete(ticket.id);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <li className="ticket-item">
      <p><strong>Ticket #:</strong> {index + 1}</p>
      <p><strong>Student ID:</strong> {ticket.studentId}</p>
      <p><strong>Full Name:</strong> {ticket.fullName}</p>
      <p><strong>Category:</strong> {ticket.category}</p>
      <p><strong>Details:</strong> <em>{ticket.details}</em></p>
      <p><strong>Submitted At:</strong> {ticket.submittedAt ? new Date(ticket.submittedAt).toLocaleString() : "N/A"}</p>

      <div className="ticket-actions">
        <span className="edit-link" onClick={handleEdit}>Edit</span>
        <span className="delete-link" onClick={handleDeleteClick}>Delete</span>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="You want to delete?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </li>
  );
}
