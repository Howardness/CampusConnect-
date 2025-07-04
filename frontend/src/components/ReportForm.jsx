import React from "react";
import SubmitButton from "./SubmitButton";

export default function ReportForm({
  form,
  errors,
  isSubmitting,
  editingTicket,
  handleChange,
  handleSubmit,
  handleBack,
}) {
  const categories = [
    { value: "academic", label: "Academic Issue", icon: "🎓" },
    { value: "technical", label: "Technical Issue", icon: "💻" },
    { value: "facility", label: "Facility Issue", icon: "🏢" },
    { value: "financial", label: "Financial Issue", icon: "💳" },
    { value: "harassment", label: "Harassment/Bullying", icon: "🚫" },
    { value: "others", label: "Other", icon: "📝" },
  ];

  return (
    <form onSubmit={handleSubmit} className="report-form">
      {/* ✅ Back button + Header */}
      <div className="form-top-bar">
        <button
          type="button"
          onClick={handleBack}
          className="back-button top"
        >
          ← Back
        </button>
        <h2 className="form-header-title">Issue</h2>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className={errors.studentId ? "error" : ""}
          />
          {errors.studentId && (
            <div className="error-message">{errors.studentId}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Issue Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={errors.category ? "error" : ""}
        >
          <option value="">Select an issue category</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <div className="error-message">{errors.category}</div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Issue Details</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          rows={5}
          className={errors.details ? "error" : ""}
          maxLength={500}
        />
        <div className="form-footer">
          {errors.details ? (
            <div className="error-message">{errors.details}</div>
          ) : (
            <span className="helper-text">Minimum 10 characters required </span>
          )}
          <span className="char-counter">{form.details.length}/50</span>
        </div>
      </div>

      {/* ✅ Submit button */}
      <div className="form-buttons">
        <SubmitButton
          isSubmitting={isSubmitting}
          editing={!!editingTicket}
          label="Issue Report"
        />
      </div>
    </form>
  );
}
