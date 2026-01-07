import React, { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const SupportTicketForm = ({ onClose }) => {
  const initialFormState = {
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  };

  const [ticketForm, setTicketForm] = useState(initialFormState);
  const [loading, setLoading] = useState({ status: "idle", message: "" });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const formRef = useRef(null);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading({ status: "submitting", message: "" });

    try {
      // Remove old hidden fields
      formRef.current
        .querySelectorAll("input[type='hidden']")
        .forEach(el => el.remove());

      const addHiddenField = (name, value) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        formRef.current.appendChild(input);
      };

      addHiddenField("form_type", "Support Ticket");
      addHiddenField("to_email", "bhaskarece9@gmail.com");

      await emailjs.sendForm(
        "service_kx0lp7a",
        "template_ytlidxg",
        formRef.current,
        "ryU_OCk3yj3cf1E_4"
      );

      setLoading({ status: "success", message: "Ticket submitted successfully." });
      setTicketSubmitted(true);
      setTicketForm(initialFormState);
      formRef.current.reset();

      // Auto-close if provided
      if (onClose) {
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      console.error("Support ticket error:", err);
      setLoading({ status: "error", message: "Failed to send message" });
    }
  };

  return (
    <div className="support-ticket-tab">
      {ticketSubmitted ? (
        <div className="support-ticket-success">
          <CheckCircle className="support-ticket-success-icon" />
          <h3>Ticket Submitted Successfully!</h3>
          <p>We&apos;ll respond to your inquiry within 24 hours.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleTicketSubmit}
          className="support-ticket-form"
        >
          <h3>Submit a Support Ticket</h3>

          <div className="support-form-row">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
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
                name="email"
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
              name="category"
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
              name="subject"
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
              name="message"
              required
              rows={6}
              value={ticketForm.message}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, message: e.target.value })
              }
              placeholder="Please provide detailed information about your issue..."
            />
          </div>

          <button
            type="submit"
            className="support-ticket-submit-btn"
            disabled={loading.status === "submitting"}
          >
            <Send className="support-ticket-send-icon" />
            <span>
              {loading.status === "submitting" ? "Submitting..." : "Submit Ticket"}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};

export default SupportTicketForm;
