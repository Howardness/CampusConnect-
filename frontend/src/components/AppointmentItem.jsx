import React from 'react';

export default function AppointmentItem({ appt, index, onEdit, onDelete }) {
  return (
    <li className="appointment-item">
      <p><strong>Appointment #:</strong> {index + 1}</p>
      <p><strong>Student ID:</strong> {appt.studentNo}</p>
      <p><strong>Full Name:</strong> {appt.fullName}</p>
      <p><strong>Category:</strong> {appt.category}</p>
      <p><strong>When:</strong> {new Date(appt.appointmentTime).toLocaleString()}</p>

      <div className="appointment-actions">
        <span className="edit-link" onClick={() => onEdit(appt)}>Edit</span>
        <span className="delete-link" onClick={() => onDelete(appt.id)}>Delete</span>
      </div>
    </li>
  );
}
