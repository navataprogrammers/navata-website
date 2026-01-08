import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { uploadResumeToS3 } from "../../lib/uploadResumeToS3";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  experience: "",
  jobSource: "",
};

const ApplicationForm = ({ jobId, jobName, onSubmitSuccess }) => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const errs = {};

    if (!formData.firstName) errs.firstName = "First name is required";
    if (!formData.lastName) errs.lastName = "Last name is required";
    if (!formData.email) errs.email = "Email is required";
    if (!formData.phone) errs.phone = "Phone is required";
    if (!resume) errs.resume = "Resume is required";

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errs.email = "Invalid email address";
    }

    if (resume && resume.size > 10 * 1024 * 1024) {
      errs.resume = "Resume must be under 10 MB";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ---------------- SUBMIT FORM ---------------- */
  const submitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const resumeUrl = await uploadResumeToS3(resume);
      const addHiddenField = (name, value) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        formRef.current.appendChild(input);
      };

      addHiddenField("form_type", "Careers");
      addHiddenField("name", `${formData.firstName} ${formData.lastName}`);
      addHiddenField("mobile", formData.phone);
      addHiddenField("job_name", jobName);
      addHiddenField("resume_link", resumeUrl);
      //addHiddenField("to_email", "customercare@navata.com");
      addHiddenField("to_email", "careers@navata.com");

      await emailjs.sendForm(
        'service_kx0lp7a',        // service ID
        'template_ytlidxg',       // template id
        formRef.current,
        'ryU_OCk3yj3cf1E_4'         // public key
      );

      alert("Application submitted successfully!");

      setFormData(initialFormState);
      setResume(null);
      formRef.current.reset();
      onSubmitSuccess?.();
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="application-form-main-page">
      <h2>Apply for this Position</h2>

      <form ref={formRef} onSubmit={submitForm} noValidate>
        {/* First & Last Name */}
        <div className="application-form-row">
          <div className="application-form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInput}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && (
              <span className="application-form-error-message">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="application-form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInput}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && (
              <span className="application-form-error-message">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="application-form-row">
          <div className="application-form-group">
            <label>Email *</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInput}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="application-form-error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div className="application-form-group">
            <label>Phone *</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInput}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && (
              <span className="application-form-error-message">
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="application-form-group">
          <label>Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInput}
          >
            <option value="">Select…</option>
            <option value="0-1">0–1 years</option>
            <option value="2-5">2–5 years</option>
            <option value="5-10">5–10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        {/* Job Source */}
        <div className="application-form-group">
          <label>How did you hear about us?</label>
          <select
            name="job_source"
            value={formData.job_source}
            onChange={handleInput}
          >
            <option value="">Select…</option>
            <option value="Naukri">Naukri</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Company Website">Company Website</option>
            <option value="Indeed">Indeed</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Resume Upload */}
        <div className="application-form-group">
          <label>Resume (PDF / DOC / DOCX) *</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />
          {errors.resume && (
            <span className="application-form-error-message">
              {errors.resume}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="application-form-submit-btn"
        >
          {submitting ? "Submitting…" : "Submit Application"}
        </button>
      </form>
    </section>
  );
};

export default ApplicationForm;
