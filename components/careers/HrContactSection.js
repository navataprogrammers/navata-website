import React from 'react';
import Image from 'next/image';

const HRContactSection = () => (
  <section className="hr-support-section" id="hr-support">
    {/* Left Section */}
    <div className="hr-support-left">
      <Image
        src="https://img.icons8.com/fluency/96/handshake.png"
        alt="Recruitment Support"
        width={65}
        height={65}
      />
      <div>
        <h2>We’re Here for You!</h2>
        <p>For job and application queries, get in touch with our HR team:</p>
      </div>
    </div>

    {/* Contact Section */}
    <div className="hr-support-contact">
      <p className="hr-contact-item">
        <Image
          src="https://img.icons8.com/ios-filled/20/000000/new-post.png"
          alt="Email icon"
          width={20}
          height={20}
        />
        <a href="mailto:careers@navata.com">careers@navata.com</a>
      </p>

      <p className="hr-contact-item">
        <Image
          src="https://img.icons8.com/ios-filled/20/000000/phone.png"
          alt="Phone icon"
          width={20}
          height={20}
        />
        <a href="tel:+918985416143">+91 88854 16143</a>
      </p>
    </div>
  </section>
);

export default HRContactSection;
