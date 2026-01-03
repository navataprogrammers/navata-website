import React, { useState, useCallback } from 'react';
import Image from 'next/image'; 
import { Phone, Send, Mail, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import emailjs from '@emailjs/browser';
import '../../styles/Footer.css';

const WhatsAppIcon = ({ size = 28, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.888-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);

const ContactCard = ({ href, icon, title, children, iconClass }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
        <div className="contact-card">
            <div className={`contact-icon ${iconClass || ''}`}>{icon}</div>
            <h3 className="contact-title">{title}</h3>
            <div className="contact-info">{children}</div>
        </div>
    </a>
);

const SocialLinks = () => (
    <div className="social-links">
        <a href="https://www.linkedin.com/company/navata-road-transport-official/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={28} /></a>
        <a href="https://www.facebook.com/NavataRoadTransportOfficial/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={28} /></a>
        <a href="https://www.instagram.com/navatatransportofficial/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={28} /></a>
        <a href="https://x.com/navataroadtrans" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaXTwitter size={28} /></a>
    </div>
);


const Footer = () => {
  const initialFormState = { name: '', email: '', mobile: '', message: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [submissionStatus, setSubmissionStatus] = useState({ status: 'idle', message: '' });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmissionStatus({ status: 'submitting', message: '' });

    try {
      await emailjs.send(
        'service_kx0lp7a',        // service ID
        'template_ytlidxg',       // template id
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        },
        'ryU_OCk3yj3cf1E_4'         // public key
      );

      setSubmissionStatus({
        status: 'success',
        message: 'Thank you! Your message has been sent.'
      });

      setFormData(initialFormState);
      setTimeout(() => setSubmissionStatus({ status: 'idle', message: '' }), 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmissionStatus({
        status: 'error',
        message: 'Failed to send message. Please try again.'
      });
      setTimeout(() => setSubmissionStatus({ status: 'idle', message: '' }), 5000);
    }
  }, [formData]);


  return (
    <div className="footer-wrapper">
    {/* Truck animation above black section */}
      <div className="truck-animation-container">
      <Image
        src="/images/animation_truck.webp"
        alt="Moving Truck"
        width={80}
        height={50}
        priority
      />
      </div>
      <footer className="footer">

      <section id="get-in-touch" className="get-in-touch">
        <div className="container">
          <header className="get-header">
            <h1 className="main-heading">Get in Touch</h1>
            <p className="caption">
              We&apos;d love to help you with your logistics needs. Feel free to reach out to us.
            </p>
          </header>
          
          <div className="contact-methods">
            <ContactCard href="https://wa.me/919248094455" icon={<WhatsAppIcon size={32} />} title="WhatsApp" iconClass="whatsapp-icon">
              Chat with us directly
            </ContactCard>
            <ContactCard href="https://www.google.com/maps/place/Navata+Road+Transport/@16.5022684,80.6841957,17z" icon={<MapPin size={28} color="#ffffff" />} title="Head Office" iconClass="location-icon">
              <strong>D.NO: 18-667 Bose Building, Kanuru, Vijayawada </strong><br />
              Andhra Pradesh 520007
            </ContactCard>                        
            {/* Contact Us Card */}
            <div className="contact-card">
            <h3 className="contact-title">Contact Us</h3>
            <a href="tel:+919248094455" className="contact-info-item">
            <span className="icon-bubble phone-bubble"><Phone size={14} /></span>
            <span>+91 9248094455</span>
            </a>
            <a href="mailto:customercare@navata.com" className="contact-info-item">
            <span className="icon-bubble gmail-bubble"><Mail size={14} /></span>
            <span>customercare@navata.com</span>
            </a>
            </div>
          </div>
          
          <div className="form-follow-container">
            <div className="form-section">
              <h2 className="form-title">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="form-input" required />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" className="form-input" required />
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Your Phone" className="form-input" required />
                </div>
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your query" className="form-textarea" required />
                <button type="submit" className="submit-btn" disabled={submissionStatus.status === 'submitting'}>
                  <Send size={20} />
                  {submissionStatus.status === 'submitting' ? "Sending..." : "Send Message"}
                </button>
              </form>

              {submissionStatus.status === 'success' && (
                <div className="submission-message success"><CheckCircle size={20} /> {submissionStatus.message}</div>
              )}
              {submissionStatus.status === 'error' && (
                <div className="submission-message error"><XCircle size={20} /> {submissionStatus.message}</div>
              )}
            </div>

            <aside className="follow-us-section">
              <h3 className="follow-us-title">Follow Us</h3>
              <SocialLinks />
            </aside>
          </div>
        </div>
      </section>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Navata Road Transport. All rights reserved.</p>
      </div>
    </footer>
  </div>
  );
}
export default Footer;