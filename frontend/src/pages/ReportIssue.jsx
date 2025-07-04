  // src/pages/ReportIssue.jsx
  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import ReportLayout from "../components/ReportLayout";
  import ReportForm from "../components/ReportForm";
  import SuccessMessage from "../components/SuccessMessage";
  import "./ReportIssue.css";
  

  export default function ReportIssue() {
    useEffect(() => {
      document.title = "Campus Connect | Report Issue"
    }, []);
    
    const navigate = useNavigate();
    const location = useLocation();
    const initialTicket = location.state?.ticket || null;

    const [editingTicket, setEditingTicket] = useState(initialTicket);
    const [form, setForm] = useState({
      studentId: initialTicket?.studentId || "",
      fullName: initialTicket?.fullName || "",
      category: initialTicket?.category || "",
      details: initialTicket?.details || "",
    });

    console.log("ReportIssue rendered", form);

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
      if (!form.studentId.trim()) newErrors.studentId = "Student ID is required";
      else if (!/^\d+$/.test(form.studentId.trim())) newErrors.studentId = "Invalid Student ID – numbers only";
      if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!form.category) newErrors.category = "Please select a category";
      if (!form.details.trim()) {
  newErrors.details = "Please provide details";
} else if (form.details.trim().length < 10 || form.details.trim().length > 50) {
  newErrors.details = "Details must be 10–50 characters";
} else if (!/^[a-zA-Z0-9\s.,!?'"()-]+$/.test(form.details.trim())) {
  newErrors.details = "Only letters, numbers, and common punctuation allowed";
}


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
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error(await res.text());

        await res.json();
        setIsSubmitted(true);
        setIsSubmitting(false);

        setTimeout(() => {
          setIsSubmitted(false);
          setForm({ studentId: "", fullName: "", category: "", details: "" });
          setEditingTicket(null);
        }, 2000);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert("Submission failed. Please try again.");
        setIsSubmitting(false);
      }
    };

    const handleEditFromTicket = (ticket) => {
      setEditingTicket(ticket);
      setForm({
        studentId: ticket.studentId,
        fullName: ticket.fullName,
        category: ticket.category,
        details: ticket.details,
      });
    };

    const handleBack = () => navigate("/dashboard");
    const resetForm = () => {
      setForm({ studentId: "", fullName: "", category: "", details: "" });
      setErrors({});
      setIsSubmitted(false);
    };

    return (
      <ReportLayout onEdit={handleEditFromTicket}>
        {isSubmitted ? (
          <SuccessMessage
            editingTicket={editingTicket}
            resetForm={resetForm}
            handleBack={handleBack}
          />
        ) : (
          <ReportForm
            form={form}
            errors={errors}
            isSubmitting={isSubmitting}
            editingTicket={editingTicket}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
          />
        )}
      </ReportLayout>
    );
  } 
