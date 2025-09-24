import React from 'react';
import Image from 'next/image';
import { Truck, MapPin, ArrowRight, CheckCircle, Star, Warehouse } from 'lucide-react';
import AnimateOnScroll from '../components/AnimateonScroll';
import '../styles/Services.css';

const iconMap = {
  truck: <Truck className="w-8 h-8" />,
  warehouse: <Warehouse className="w-8 h-8" />,
  mapPin: <MapPin className="w-8 h-8" />,
};

const ServicesPage = ({ services, valueAdds, process }) => {
  return (
    <div className="services-page">
    <div className="services-banner">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 L 0.8 0 Q 1 0.5, 0.8 1 L 0 1 Z"></path>
          </clipPath>
        </defs>
      </svg>   
      <Image
        src="/images/IMG_5313 edited.jpg"
        alt="Illustration representing logistics and delivery services"
        className="hero-bg-img"
        fill
        priority
      />
      {/* Left overlay */}
      <div className="services-banner-overlay"></div>

      {/* Text content */}
      <div className="services-banner-text">
        <AnimateOnScroll className="scroll-animate" delay={200}>
          <h1 className="services-main-title">OUR SERVICES</h1>
          <p className="services-subtitle">
           Comprehensive logistics solutions designed to accelerate your business
           growth and expand your possibilites.
          </p>
        </AnimateOnScroll>
      </div>
    </div>
  
      {/* Core Services Section */}
      <div className="services-main">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-section-title">Core Services</h2>
            <p className="services-section-desc">
              Comprehensive logistics solutions tailored to meet your unique business requirements
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <AnimateOnScroll
                key={service.id}
                className="services-card"
                delay={index * 100} >
                <div className="services-card-content">
                  <div className="services-card-icon">{iconMap[service.icon]}</div>
                  <div className="services-card-text">
                    <h3 className="services-card-title">{service.title}</h3>
                    <p className="services-card-desc">{service.description}</p>
                    <div className="services-card-features">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="services-card-feature">
                          <CheckCircle className="services-card-check" />
                          <span className="services-card-feature-text">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="services-card-arrow">
                  <ArrowRight className="services-arrow-icon" />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Logistics Process Section */}
      <div className="logistics-section">
        <h2 className="section-title">Our Logistics Process</h2>
        <AnimateOnScroll>
          <div className="steps-flow">
            {process.map((step, index) => (
              <div key={step.id} className="step-flow-item animate-step" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="step-circle">
                  <Image
                    src={step.img}
                    alt={step.title}
                    className="step-icon"
                    objectFit="contain"
                     width={294}   
                     height={294}  
                  />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>

      {/* Value Added Services */}
      <div className="services-value-added">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-section-title">Value Added Services</h2>
            <p className="services-section-desc">
              Additional services to enhance your logistics experience and operational efficiency
            </p>
          </div>

          <div className="services-value-grid">
            {valueAdds.map((item, index) => (
              <AnimateOnScroll
                key={index}
                className="services-value-card"
                delay={index * 120}  >
                <div className="services-value-card-content">
                  <div className="services-value-card-icon">
                    <Star className="services-value-star" />
                  </div>
                  <div className="services-value-card-text">
                    <h3 className="services-value-card-title">{item.title}</h3>
                    <p className="services-value-card-desc">{item.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export async function getStaticProps() {
  const services = [
  {
    id: 1,
    title: "Transportation Solutions",
    icon: 'truck',
    description: "Seamless freight movement across regions with real-time tracking and guaranteed delivery schedules.",
    features: ["GPS Tracking", "360 degree Package Monitoring","Hassle free & Cashless Payments","Intense Reachability"]
  },
  {
    id: 2,
    title: "Warehousing & Storage",
    icon: 'warehouse',
    description: "State-of-the-art warehouse facilities with automated inventory management and flexible storage options.",
    features: ["Inventory Management", "Climate Control", "Security Systems", "Flexible Storage"]
  },
  {
    id: 3,
    title: "3PL (Third-Party Logistics)",
    icon: 'mapPin',
    description: "Comprehensive outsourced logistics services, combining transportation, warehousing, and value-added solutions.",
    features: ["Scalable Operations", "End-to-End Logistics", "Custom Solutions"]
  }
  ];

  const valueAdds = [
    { title: "Real-Time Tracking", desc: "Monitor your shipments 24/7 with GPS precision" },
    { title: "Reverse Logistics", desc: "Efficient returns" },
    { title: "Cross Docking", desc: "Streamlined distribution without storage delays" },
    { title: "Custom Solutions", desc: "Tailored logistics for your specific needs" }
  ];

  const process = [
    {
      id: 1,
      title: "Order Booking",
      desc: "Customers place a consignment order online or at our branch.",
      img: "/images/services_our_process/order_processing.png",
    },
    {
      id: 2,
      title: "Pickup & Warehousing",
      desc: "Goods are collected, and stored safely in our warehouse.",
      img: "/images/services_our_process/warehouse.png",
    },
    {
      id: 3,
      title: "Transportation Planning",
      desc: "We assign the best route and allocate vehicles from our fleet.",
      img: "/images/services_our_process/Transportation.png",
    },
    {
      id: 4,
      title: "In-Transit & Tracking",
      desc: "Shipments move securely with tracking updates.",
      img: "/images/services_our_process/Intransit.png",
    },
    {
      id: 5,
      title: "Last-Mile Delivery",
      desc: "Our delivery team ensures safe and timely delivery to the customer.",
      img: "/images/services_our_process/Lastmile.png",
    },
    {
      id: 6,
      title: "Proof of Delivery",
      desc: "Instant digital confirmation (POD) shared with customers.",
      img: "/images/services_our_process/Delivery.png",
    },
  ];

   return {
    props: {
      services,
      valueAdds,
      process,
    },
  };
}

export default ServicesPage;