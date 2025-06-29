import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAppointments.css';

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
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
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchAppointments(); // Refresh
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error deleting appointment.");
    }
  };

  const handleEdit = (appointment) => {
    navigate("/schedule-appointment", { state: { appointment } });
  };

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <ul className="appointments-list">
        {appointments.map((appt, index) => (
          <li key={appt.id} className="appointment-item">
            <p><strong>Appointment #:</strong> {index + 1}</p>
            <p><strong>Student ID:</strong> {appt.studentNo}</p>
            <p><strong>Full Name:</strong> {appt.fullName}</p>
            <p><strong>Category:</strong> {appt.category}</p>
            <p><strong>When:</strong> {new Date(appt.appointmentTime).toLocaleString()}</p>

            <div className="appointment-actions">
              <span className="edit-link" onClick={() => handleEdit(appt)}>Edit</span>
              <span className="delete-link" onClick={() => handleDelete(appt.id)}>Delete</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
