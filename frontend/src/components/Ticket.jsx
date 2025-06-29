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
      <p><strong>Ticket #:</strong> {index + 1}</p>
      <p><strong>Student ID:</strong> {ticket.studentId}</p>
      <p><strong>Full Name:</strong> {ticket.fullName}</p>
      <p><strong>Category:</strong> {ticket.category}</p>
      <p><strong>Details:</strong> <em>{ticket.details}</em></p>
      <p><strong>Submitted At:</strong> {ticket.submittedAt ? new Date(ticket.submittedAt).toLocaleString() : "N/A"}</p>

      <div className="ticket-actions">
        <span className="edit-link" onClick={handleEdit}>Edit</span>
        <span className="delete-link" onClick={confirmDelete}>Delete</span>
      </div>
    </li>
  );
}
