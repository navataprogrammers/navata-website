import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/Inquiryform.css";

const FranchiseInquiryModal = ({
  isOpen,
  onClose,
  franchiseName,
  franchiseLocation
}) => {
  const initialFormState = {
    name: "",
    mobile: "",
    email: "",
    city: franchiseLocation || "",
  };

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState({ status: "idle", message: "" });
  const formRef = useRef(null);

  useEffect(() => {
    setForm((prev) => ({ ...prev, city: franchiseLocation || "" }));
  }, [franchiseLocation]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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

      addHiddenField("form_type", "Franchise Enquiry");
      addHiddenField("to_email", "bhaskargandham9800@gmail.com");

      await emailjs.sendForm(
        "service_kx0lp7a",
        "template_ytlidxg",
        formRef.current,
        "ryU_OCk3yj3cf1E_4"
      );

      setLoading({
        status: "success",
        message: "Thank you! Your message has been sent.",
      });

      setForm(initialFormState);
      formRef.current.reset();
      setTimeout(() => {
      onClose();
      }, 1500);
    } catch (err) {
      console.error("Franchise enquiry error:", err);
      setLoading({
        status: "error",
        message: "Failed to send message",
      });
    }
  };

  return (
    <div className="franchise-modal-overlay">
      <div className="franchise-modal">
        <button
          className="franchise-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2>Franchise Inquiry for: {franchiseName}</h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="franchise-inquiry-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading.status === "submitting"}
          >
            {loading.status === "submitting" ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>

        {loading.status === "success" && (
          <p className="success-message">{loading.message}</p>
        )}
        {loading.status === "error" && (
          <p className="error-message">{loading.message}</p>
        )}
      </div>
    </div>
  );
};

export default FranchiseInquiryModal;
