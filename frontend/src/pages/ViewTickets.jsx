import React, { useEffect, useState } from "react";
import Ticket from "../components/Ticket";
import "./ViewTickets.css";

export default function ViewTickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  const fetchTickets = () => {
    fetch("http://localhost:8080/api/tickets")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tickets");
        return res.json();
      })
      .then((data) => {
        console.log("Tickets fetched:", data);
        setTickets(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/tickets/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setDeleteMessage("✅ Ticket deleted successfully.");
        fetchTickets();
        setTimeout(() => setDeleteMessage(""), 3000); // auto clear
      })
      .catch((err) => alert("Failed to delete: " + err.message));
  };

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="ticket-container">
      <h2>Report Tickets</h2>

      {/* ✅ Delete success message */}
      {deleteMessage && (
        <div className="delete-success-message">
          {deleteMessage}
          <button className="dismiss-btn" onClick={() => setDeleteMessage("")}>
            ×
          </button>
        </div>
      )}

      <div className="ticket-scroll">
        <ul className="ticket-list">
          {tickets.map((ticket, index) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
