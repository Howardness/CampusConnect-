import React, { useState } from 'react';
import AppointmentItem from './AppointmentItem';
import ConfirmDialog from './ConfirmDialog';

export default function AppointmentList({ appointments, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (selectedId) {
      onDelete(selectedId);
    }
    setShowConfirm(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <>
      <ul className="appointments-list">
        {appointments.map((appt, index) => (
          <AppointmentItem
            key={appt.id}
            appt={appt}
            index={index}
            onEdit={onEdit}
            onDelete={() => handleDeleteClick(appt.id)} // uses local handler
          />
        ))}
      </ul>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this appointment?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
