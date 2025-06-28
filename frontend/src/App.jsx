// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import ViewTickets from "./pages/ViewTickets";
import IssueDashboard from "./pages/IssueDashboard";
import AboutUs from "./pages/AboutUs";
import ReportIssue from "./pages/ReportIssue";
import Register from "./pages/Register";
import './App.css'; 
import Ticket from "./components/Ticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"       element={<LoginPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
         {/* other routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-issue" element={<IssueDashboard />} />
        <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
        <Route path="/view-tickets" element={<ViewTickets />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/report" element={<ReportIssue />} /> 
        <Route path="ticket" element={<Ticket />} />
      </Routes>
    </Router>
  );
}

export default App;
