import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewTickets from "./ViewTickets";
import './ReportIssue.css';

export default function ReportIssue() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTicket = location.state?.ticket || null;

  const [form, setForm] = useState({
    studentId: editingTicket?.studentId || "",
    fullName: editingTicket?.fullName || "",
    category: editingTicket?.category || "",
    details: editingTicket?.details || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    } else if (!/^\d+$/.test(form.studentId.trim())) {
      newErrors.studentId = "Invalid Student ID – numbers only";
    }
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.category) newErrors.category = "Please select a category";
    if (!form.details.trim()) newErrors.details = "Please provide details";
    else if (form.details.trim().length < 10) newErrors.details = "Please provide more detailed information";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const url = editingTicket
      ? `http://localhost:8080/api/tickets/${editingTicket.id}`
      : "http://localhost:8080/api/tickets";

    const method = editingTicket ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to submit issue: " + errorText);
      }

      await response.json();
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setForm({ studentId: "", fullName: "", category: "", details: "" });
        if (editingTicket) navigate("/dashboard");
      }, 3000);

    } catch (error) {
      console.error(error);
      alert("Error submitting issue. Please try again.");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ studentId: "", fullName: "", category: "", details: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleBack = () => navigate("/dashboard");

  const categories = [
    { value: "academic", label: "Academic Issue", icon: "🎓" },
    { value: "technical", label: "Technical Issue", icon: "💻" },
    { value: "facility", label: "Facility Issue", icon: "🏢" },
    { value: "financial", label: "Financial Issue", icon: "💳" },
    { value: "harassment", label: "Harassment/Bullying", icon: "🚫" },
    { value: "others", label: "Other", icon: "📝" }
  ];

  if (isSubmitted) {
    return (
      <div className="report-container">
        <div className="drawer open">
          <div className="report-wrapper">
            <div className="success-card">
              <div className="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <h2>{editingTicket ? "Ticket Updated Successfully!" : "Issue Reported Successfully!"}</h2>
              <p>Your ticket has been {editingTicket ? "updated" : "created"} and processed.</p>
              {!editingTicket && (
                <button onClick={resetForm} className="success-button">
                  Report Another Issue
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
      <div className="left-panel">
        <div className="drawer open">
          <div className="report-wrapper">

            <button onClick={handleBack} className="back-button">
              ← Back 
            </button>

            <div className="report-header">
              <div className="header-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h1>{editingTicket ? "Edit Issue" : "Report an Issue"}</h1>
              <p>Help us improve by reporting any issues you encounter</p>
            </div>

            <form onSubmit={handleSubmit} className="report-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={form.studentId}
                    onChange={handleChange}
                    placeholder="Enter your student ID"
                    className={errors.studentId ? 'error' : ''}
                  />
                  {errors.studentId && <div className="error-message">{errors.studentId}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Issue Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Select an issue category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Issue Details</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Please provide detailed information about the issue you're experiencing..."
                  className={errors.details ? 'error' : ''}
                />
                <div className="form-footer">
                  {errors.details ? (
                    <div className="error-message">{errors.details}</div>
                  ) : (
                    <span className="helper-text">Minimum 10 characters required</span>
                  )}
                  <span className="char-counter">{form.details.length}/500</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? "Submitting..." : editingTicket ? "Update Ticket" : "Submit Issue Report"}
              </button>
            </form>

            <div className="report-footer">
              <p>
                Need immediate assistance? Contact support at {" "}
                <a href="mailto:cit@university.edu">cit@university.edu</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <ViewTickets />
      </div>
    </div>
  );
}
