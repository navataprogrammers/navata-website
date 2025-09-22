import React, { useState, useEffect } from "react";
import "../../styles/Inquiryform.css"; 

const FranchiseInquiryModal = ({
  isOpen,
  onClose,
  franchiseName,
  franchiseLocation
}) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "", 
    location: franchiseLocation || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, location: franchiseLocation || "" }));
  }, [franchiseLocation]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //Baackend URl to send the data to mail 
    try {
      const response = await fetch("/api/send-franchise-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          franchiseName, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inquiry sent successfully!");
        setForm({ name: "", mobile: "", email: "", location: franchiseLocation || "" });
        onClose();
      } else {
        alert(`Error: ${data.message || "Failed to send"}`);
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      alert("Something went wrong while sending the inquiry.");
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSubmit} className="franchise-inquiry-form">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="tel" name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email ID" value={form.email} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FranchiseInquiryModal;
