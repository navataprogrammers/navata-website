import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Error sending email");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" ,padding: "100px"}}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="message"
        placeholder="Your Message"
        onChange={handleChange}
        required
      ></textarea>
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
