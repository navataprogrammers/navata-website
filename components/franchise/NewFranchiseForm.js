import React, { useState, useEffect, useRef } from "react";
import { sendEmail } from "../../lib/sendEmail";
import { Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";

const NewFranchiseForm = () => {
  const formRef = useRef(null);

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
      //  Remove old hidden fields (prevents duplicates)
      formRef.current
        .querySelectorAll("input[type='hidden']")
        .forEach((el) => el.remove());

      //  Helper to add hidden fields
      const addHiddenField = (name, value) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        formRef.current.appendChild(input);
      };

      //  Fields NOT present in the visible form
      addHiddenField("form_type", "Franchise Request");
      addHiddenField("to_email", "agency@navata.com");
      addHiddenField(
        "extra",
        `Proposed Location: ${formData.location} | Reason: ${formData.message || "Not provided"}`
    );

      await sendEmail(formRef);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        location: "",
        message: "",
      });

      formRef.current.reset();
    } catch (error) {
      console.error("Error sending franchise request:", error);
      alert("Something went wrong while sending the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <section id="franchise-request-block" className="franchise-request-bg">
      <div className="franchise-request-grid">
        <div className="franchise-request-info">
          <h2 className="franchise-request-title">
            Don&apos;t See Your Location?
          </h2>
          <p className="franchise-request-lead">
            We are always looking to expand into new territories. If you have a
            location in mind and believe it&apos;s a great fit for a Navata
            franchise, let us know!
          </p>

          <div className="franchise-request-imgwrap">
            <Image
              src="/images/new_franchise.jpg"
              alt="Logistics map"
              className="franchise-request-img"
              width={2000}
              height={1000}
              priority
            />
          </div>
        </div>

        <div className="franchise-request-formwrap">
          <h3 className="franchise-request-formtitle">
            Request a New Location
          </h3>

          <form
            ref={formRef}
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
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="franchise-form-label">
                Proposed City/Town
              </label>
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

            <button
              className="franchise-form-btn"
              disabled={isSubmitting}
            >
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
