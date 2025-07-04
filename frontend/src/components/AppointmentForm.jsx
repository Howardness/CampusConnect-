import React from "react";

export default function AppointmentForm({ form, error, handleChange, handleSubmit, editingAppt }) {
  return (
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
        {error.studentNo && <div className="error-message">{error.studentNo}</div>}
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
        {error.fullName && <div className="error-message">{error.fullName}</div>}
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
        {error.category && <div className="error-message">{error.category}</div>}
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
        {error.date && <div className="error-message">{error.date}</div>}
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
        {error.time && <div className="error-message">{error.time}</div>}
      </div>

      <button type="submit" className="submit-appointment">
        {editingAppt ? "Update" : "Schedule"}
      </button>
    </form>
  );
}
