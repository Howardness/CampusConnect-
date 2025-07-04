// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import ViewTickets from "./pages/ViewTickets";
import AboutUs from "./pages/AboutUs";
import CombinedView from "./components/CombinedView";
import ReportForm from "./components/ReportForm";
import ReportLayout from "./components/ReportLayout";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/"             element={<Navigate to="/login" />} />
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/register"     element={<Register />} />

        {/* Protected or Main Routes */}
        <Route path="/dashboard"              element={<Dashboard />} />
         <Route path="/report"                element={<ReportIssue />} />
        <Route path="/report-issue"           element={<ReportIssue />} />
        <Route path="/schedule-appointment"   element={<ScheduleAppointment />} />
        <Route path="/view-tickets"           element={<ViewTickets />} />
        <Route path="/about-us"               element={<AboutUs />} />

        {/* Modular Components (for debugging or dev purposes) */}
        <Route path="/report-form"            element={<ReportForm />} />
        <Route path="/report-layout"          element={<ReportLayout />} />

        {/* Combined View Routes */}
        <Route path="/combined"               element={<CombinedView />} />
        <Route path="/dashboard/overview"     element={<CombinedView />} />
        <Route path="/overview"               element={<CombinedView />} />
      </Routes>
    </Router>
  );
}

export default App;
