import React, { useState } from 'react';
import { AWS_API_BASE_URL } from "../../lib/awsApi";
import { uploadFileToS3 } from "../../lib/uploadToS3";


const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experience: '',
  jobSource: '',
  resume: null
};

const ApplicationForm = ({ jobId, jobName, onSubmitSuccess }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    ['firstName', 'lastName', 'email', 'phone', 'resume'].forEach(field => {
      if (!formData[field]) {
        errs[field] = `${field === 'resume' ? 'Resume' : field} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

   const submitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const resumeUrl = await uploadFileToS3(formData.resume);

      await fetch(`${AWS_API_BASE_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Careers",
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          mobile: formData.phone,
          resumeUrl,
          extra: `
            Job ID: ${jobId}
            Job Name: ${jobName}
            Experience: ${formData.experience}
            Source: ${formData.jobSource}
          `,
        }),
      });

      alert("Application submitted successfully!");
      setFormData(initialFormState);
      onSubmitSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <section className="application-form-main-page">
      <h2>Apply for this Position</h2>
      <form onSubmit={submitForm}>
        {/* Name / Email / Phone */}
        <div className="application-form-row">
          {['firstName', 'lastName', 'email', 'phone'].map(field => (
            <div className="application-form-group" key={field}>
              <label htmlFor={field}>
                {field === 'firstName' ? 'First Name' : 
                 field === 'lastName' ? 'Last Name' : 
                 field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              <input
                id={field}
                name={field}
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                value={formData[field]}
                onChange={handleInput}
                className={errors[field] ? 'error' : ''}
              />
              {errors[field] && (
                <span className="application-form-error-message">{errors[field]}</span>
              )}
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="application-form-group">
          <label htmlFor="experience">Experience</label>
          <select 
            id="experience" 
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

        {/*wher do you find  the job*/}
          <div className="application-form-group">
          <label htmlFor="How did you here us">How Did You Here About US</label>
           <select
              id="jobSource"
              name="jobSource"
              value={formData.jobSource}
              onChange={handleInput}
          >
            <option value="">Select…</option>
            <option value="Naukri">Naukri</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Company Website">Company Website</option>
            <option value="Indeed">Indeed</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Resume Upload */}
        <div className="application-form-group">
          <label>Resume *</label>
          <input 
            type="file" 
            name="resume" 
            accept=".pdf,.doc,.docx" 
            onChange={handleInput}
          />
          {errors.resume && (
            <span className="application-form-error-message">{errors.resume}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={submitting} 
          className="application-form-submit-btn"
        >
          {submitting ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>
    </section>
  );
};

export default ApplicationForm;
