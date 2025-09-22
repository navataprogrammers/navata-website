"use client"; 
import React from "react";
import {
  Clock,
  Shield,
  Handshake,
  Users,
  Truck,
  Leaf,
} from "lucide-react";
import AnimateOnScroll from "../AnimateonScroll";
import "../../styles/CompanyValues.css"; 

const CompanyValues = () => {
  const values = [
    {
      icon: <Clock className="value-card__icon" />,
      title: "Seamless Transportation",
      description:
        "Serving India with a vast network of road transport solutions, we specialize in safe, reliable, efficient logistics and ensure seamless deliveries powered by technology and trust.",
      color: "blue",
    },
    {
      icon: <Shield className="value-card__icon" />,
      title: "Security & Trust",
      description:
        "Your cargo is protected with advanced security measures and comprehensive insurance coverage.",
      color: "green",
    },
    {
      icon: <Handshake className="value-card__icon" />,
      title: "Integrity",
      description:
        "Honest, ethical, trustworthy culture at organizational and individual level ensuring efficiency and continuous commitment.",
      color: "purple",
    },
    {
      icon: <Users className="value-card__icon" />,
      title: "Customer First",
      description:
        "Dedicated support team ensuring personalized service and complete customer satisfaction.",
      color: "orange",
    },
    {
      icon: <Truck className="value-card__icon" />,
      title: "Innovation",
      description:
        "Cutting-edge technology and smart logistics solutions driving the future of transportation.",
      color: "red",
    },
    {
      icon: <Leaf className="value-card__icon" />,
      title: "Sustainability",
      description:
        "Eco-friendly practices and carbon-neutral shipping options for a greener tomorrow.",
      color: "teal",
    },
  ];

  return (
    <section className="values-section">
      <div className="values-container">
        <div className="values-header">
          <h2 className="values-title">Our Core Values</h2>
          <p className="values-subtitle">
            Built on a foundation of excellence, these values guide every
            decision we make and every mile we travel.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <AnimateOnScroll key={index}>
              <div className={`value-card value-card--${value.color}`}>
                {/* Gradient Background */}
                <div className="value-card__background"></div>

                {/* Icon Container */}
                <div className="value-card__icon-container">
                  <div className="value-card__icon-wrapper">{value.icon}</div>
                  <div className="value-card__floating-circle"></div>
                </div>

                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__description">{value.description}</p>
                <div className="value-card__border"></div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
