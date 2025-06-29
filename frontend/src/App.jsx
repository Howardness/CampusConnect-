// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import IssueDashboard from "./pages/IssueDashboard";
import ReportIssue from "./pages/ReportIssue";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import ViewTickets from "./pages/ViewTickets";
import AboutUs from "./pages/AboutUs";
import CombinedView from "./components/CombinedView";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path="/"        element={<LoginPage />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/register"element={<Register />} />

        {/* protected */}
        <Route path="/dashboard"              element={<Dashboard />} />
        <Route path="/report-issue"           element={<IssueDashboard />} />
        <Route path="/report"                 element={<ReportIssue />} />
        <Route path="/schedule-appointment"   element={<ScheduleAppointment />} />
        <Route path="/view-tickets"           element={<ViewTickets />} />
        <Route path="/about-us"               element={<AboutUs />} />
        <Route path="/combined" element={<CombinedView />} />

+       {/* combined side‑by‑side view */}
+       <Route path="/dashboard/overview"    element={<CombinedView />} />
+       <Route path="/overview"              element={<CombinedView />} />
      </Routes>
    </Router>
  );
}

export default App;
