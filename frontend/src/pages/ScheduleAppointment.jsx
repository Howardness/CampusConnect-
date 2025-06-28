import React, { useState } from "react";
import './ScheduleAppointments.css';
export default function ScheduleAppointment() {
  const [form, setForm] = useState({
    studentNo: "",
    fullName: "",
    category: "",
    date: "",
    time: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    // Combine date and time into ISO string (e.g., 2025-06-26T14:00)
    const appointmentTime = `${form.date}T${form.time}`;

    const payload = {
      studentNo: form.studentNo,
      fullName: form.fullName,
      category: form.category,
      appointmentTime
    };

    try {
      const res = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to schedule appointment");

      setSuccess(true);
      setForm({
        studentNo: "",
        fullName: "",
        category: "",
        date: "",
        time: ""
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Unable to schedule appointment. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Schedule Appointment</h2>

      {success && <p className="text-green-600 mb-2">Appointment scheduled successfully!</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="studentNo"
          placeholder="Student ID"
          value={form.studentNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="academic">Academic Advising</option>
          <option value="registrar">Registrar Service</option>
          <option value="financial">Financial Issue</option>
          <option value="facilities">Facilities Issue</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">
          Schedule
        </button>
      </form>
    </div>
  );
}
