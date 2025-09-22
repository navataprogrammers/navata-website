import React, { useState,useEffect} from "react";
import { Loader2, CheckCircle } from "lucide-react";
import Image from "next/image"; // Import Image

const NewFranchiseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/send-new-franchise-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          location: "",
          message: "",
        });
      } else {
        alert(`Error: ${data.message || "Failed to send"}`);
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      alert("Something went wrong while sending the inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false); // hide after 30 sec
      }, 10000); // 10000 ms = 10 sec

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [showSuccess]);

  return (
    <section id="franchise-request-block" className="franchise-request-bg">
      <div className="franchise-request-grid">
        <div className="franchise-request-info">
          <h2 className="franchise-request-title">Don't See Your Location?</h2>
          <p className="franchise-request-lead">
            We are always looking to expand into new territories. If you have a
            location in mind and believe it's a great fit for a Navata
            franchise, let us know! Fill out the form, and our team will get in
            touch with you.
          </p>
          <div className="franchise-request-imgwrap">
             <Image
              src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop"
              alt="Logistics map"
              className="franchise-request-img"
              width={1920}
              height={1000}
              priority
            />
          </div>
        </div>

        <div className="franchise-request-formwrap">
          <h3 className="franchise-request-formtitle">Request a New Location</h3>
          <form
            className="franchise-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label className="franchise-form-label">Full Name</label>
              <input
                className="franchise-form-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="franchise-form-label">Email Address</label>
              <input
                className="franchise-form-input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="franchise-form-label">Phone Number</label>
              <input
                className="franchise-form-input"
                name="mobile"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="franchise-form-label">Proposed City/Town</label>
              <input
                className="franchise-form-input"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="franchise-form-label">
                Why is this a good location? (Optional)
              </label>
              <textarea
                className="franchise-form-textarea"
                name="message"
                value={formData.message}
                rows={4}
                onChange={handleChange}
              />
            </div>
            <button className="franchise-form-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="franchise-loader">
                  <Loader2 size={20} className="franchise-spinner" />
                  Submitting...
                </span>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="franchise-request-success">
          <CheckCircle size={24} />
          <span>Thank you! Your request has been sent.</span>
        </div>
      )}
    </section>
  );
};

export default NewFranchiseForm;
