import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const SupportTicketForm = () => {
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [ticketSubmitted] = useState(false);

    const handleTicketSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketForm),
      });

      if (response.ok) {
        alert("Ticket submitted successfully!");
        setTicketForm({ name: "", email: "", category: "", subject: "",message: "" });
      } else {
        alert("Failed to submit ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="support-ticket-tab">
      {ticketSubmitted ? (
        <div className="support-ticket-success">
          <CheckCircle className="support-ticket-success-icon" />
          <h3>Ticket Submitted Successfully!</h3>
          <p>We'll respond to your inquiry within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleTicketSubmit} className="support-ticket-form">
          <h3>Submit a Support Ticket</h3>
          <div className="support-form-row">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                required
                value={ticketForm.name}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                required
                value={ticketForm.email}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, email: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Category</label>
            <select
              required
              value={ticketForm.category}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, category: e.target.value })
              }
            >
              <option value="">Select a category</option>
              <option value="pricing">Pricing & Charges</option>
              <option value="delivery">Delivery & Transit</option>
              <option value="services">Services</option>
              <option value="network">Network Coverage</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              required
              value={ticketForm.subject}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, subject: e.target.value })
              }
              placeholder="Brief description of your issue"
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              required
              rows={6}
              value={ticketForm.message}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, message: e.target.value })
              }
              placeholder="Please provide detailed information about your issue..."
            />
          </div>
          <button type="submit" className="support-ticket-submit-btn">
            <Send className="support-ticket-send-icon" />
            <span>Submit Ticket</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default SupportTicketForm;
