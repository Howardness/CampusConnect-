// src/pages/ScheduleAppointment.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewAppointments from "./ViewAppointments";
import "./ScheduleAppointments.css";

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingAppt = location.state?.appointment || null;

  const [form, setForm] = useState({
    id: editingAppt?.id || null,
    studentNo: editingAppt?.studentNo || "",
    fullName: editingAppt?.fullName || "",
    category: editingAppt?.category || "",
    date: editingAppt?.appointmentTime?.split("T")[0] || "",
    time: editingAppt?.appointmentTime?.split("T")[1]?.slice(0, 5) || ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError((e) => ({ ...e, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = {};
    if (!form.studentNo.trim()) errs.studentNo = "Student ID is required";
    else if (!/^\d+$/.test(form.studentNo)) errs.studentNo = "Numbers only";
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.category) errs.category = "Category required";
    if (!form.date) errs.date = "Date required";
    if (!form.time) errs.time = "Time required";
    if (Object.keys(errs).length) {
      setError(errs);
      return;
    }

    const appointmentTime = `${form.date}T${form.time}`;
    const url = editingAppt
      ? `http://localhost:8080/api/appointments/${form.id}`
      : "http://localhost:8080/api/appointments";
    const method = editingAppt ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, appointmentTime })
      });
      if (!res.ok) throw new Error(await res.text());
      setIsSubmitted(true); // Show success card
    } catch {
      setError({ submit: "Unable to save appointment. Try again." });
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      studentNo: "",
      fullName: "",
      category: "",
      date: "",
      time: ""
    });
    setIsSubmitted(false);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (isSubmitted) {
    return (
      <div className="report-container">
        <div className="drawer open">
          <div className="report-wrapper">
            <div className="success-card">
              <div className="success-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <h2>
                {editingAppt
                  ? "Appointment Updated Successfully!"
                  : "Appointment Scheduled Successfully!"}
              </h2>
              <p>
                Your appointment has been{" "}
                {editingAppt ? "updated" : "scheduled"} and processed.
              </p>
              {!editingAppt && (
                <button onClick={resetForm} className="success-button">
                  Schedule Another Appointment
                </button>
              )}
              <button onClick={handleBack} className="back-button">
                ← Back 
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="two-panel">
      {/* LEFT PANEL: Form */}
      <div className="left-panel">
        <div className="panel-inner">
          <button
            onClick={() => navigate("/dashboard")}
            className="back-button"
          >
            ← Back 
          </button>
          <h2>
            {editingAppt ? "Update Appointment" : "Schedule Appointment"}
          </h2>
          {error.submit && <p className="error">{error.submit}</p>}

          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="form-group">
              <label className="form-label">Student ID</label>
              <input
                type="text"
                name="studentNo"
                value={form.studentNo}
                onChange={handleChange}
                placeholder="Enter your student ID"
                pattern="\d+"
                className={error.studentNo ? "input-error" : ""}
              />
              {error.studentNo && (
                <div className="error-message">{error.studentNo}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={error.fullName ? "input-error" : ""}
              />
              {error.fullName && (
                <div className="error-message">{error.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={error.category ? "input-error" : ""}
              >
                <option value="">Select Category</option>
                <option value="academic">Academic Advising</option>
                <option value="registrar">Registrar Service</option>
                <option value="financial">Financial Issue</option>
                <option value="facilities">Facilities Issue</option>
              </select>
              {error.category && (
                <div className="error-message">{error.category}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={error.date ? "input-error" : ""}
              />
              {error.date && (
                <div className="error-message">{error.date}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={error.time ? "input-error" : ""}
              />
              {error.time && (
                <div className="error-message">{error.time}</div>
              )}
            </div>

            <button type="submit" className="submit-appointment">Submit 
              {editingAppt ? "Update" : " Schedule"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT PANEL: Appointment List */}
      <div className="right-panel">
        <ViewAppointments />
      </div>
    </div>
  );
}
