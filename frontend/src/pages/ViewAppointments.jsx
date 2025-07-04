// src/pages/ViewAppointments.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentList from '../components/AppointmentList';
import './ViewAppointments.css';

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch('http://localhost:8080/api/appointments')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch appointments');
        return res.json();
      })
      .then(data => setAppointments(data))
      .catch(err => setError(err.message));
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      fetchAppointments();
      setSuccessMessage("Appointment deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-clear after 3s
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error deleting appointment.");
    }
  };

  const handleEdit = (appointment) => {
    navigate("/schedule-appointment", { state: { appointment } });
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      <AppointmentList
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
