import React, {useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewAppointments from "./ViewAppointments";
import AppointmentForm from "../components/AppointmentForm";
import SuccessCard from "../components/SuccessCard";
import "./ScheduleAppointments.css";

export default function ScheduleAppointment() {
    useEffect(() => {
        document.title = "Campus Connect | Schedule Appointments"
      }, []);
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
      setIsSubmitted(true);
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

  const handleBack = () => navigate("/dashboard");

  if (isSubmitted) {
    return <SuccessCard editingAppt={editingAppt} resetForm={resetForm} handleBack={handleBack} />;
  }

  return (
    <div className="two-panel">
      <div className="left-panel">
        <div className="panel-inner">
          <button onClick={handleBack} className="back-button">← Back</button>
          <h2>{editingAppt ? "Update Appointment" : "Schedule Appointment"}</h2>
          {error.submit && <p className="error">{error.submit}</p>}
          <AppointmentForm
            form={form}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingAppt={editingAppt}
          />
        </div>
      </div>

      <div className="right-panel">
        <ViewAppointments />
      </div>
    </div>
  );
}
