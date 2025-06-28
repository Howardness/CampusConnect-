import { useNavigate } from "react-router-dom";

export default function Ticket({ ticket, index, onDelete }) {
  const navigate = useNavigate();

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      onDelete(ticket.id);
    }
  };

  const handleEdit = () => {
    navigate("/report", { state: { ticket } });
  };

  return (
   <li className="ticket-item">
  <div className="ticket-details-table">
    <div className="label">Ticket #</div>
    <div className="value">{index + 1}</div>

    <div className="label">Student ID:</div>
    <div className="value">{ticket.studentId}</div>

    <div className="label">Full Name:</div>
    <div className="value">{ticket.fullName}</div>

    <div className="label">Category:</div>
    <div className="value">{ticket.category}</div>

    <div className="label">Details:</div>
    <div className="value"><em>{ticket.details}</em></div>

    <div className="label">Submitted At:</div>
    <div className="value">
      {ticket.submittedAt
        ? new Date(ticket.submittedAt).toLocaleString()
        : "N/A"}
    </div>
  </div>

  <div className="ticket-actions">
    <span className="edit-link" onClick={handleEdit}>Edit</span>
    <span className="delete-link" onClick={confirmDelete}>Delete</span>
  </div>
</li>
  );
}
