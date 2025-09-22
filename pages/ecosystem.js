'use client';

import React from 'react';
import Image from 'next/image';
import { Building2, Heart, GraduationCap, Stethoscope, Car, Award, Users } from 'lucide-react';
import '../styles/EcoSystem.css';
import AnimateOnScroll from '../components/AnimateonScroll';

const socialResponsibilityData = [
  {
    title: "Pravataneni Subhas Chandra Bose Memorial Trust",
    icon: <Heart className="ecosystem-card-icon" />,
    description: "Established in 1996, the trust embodies the vision of giving back to society through education, healthcare, and skill development. It creates opportunities and supports communities that have been part of our journey.",
    stats: null,
    details: null,
    awards: null
  },
  {
    title: "Free Dispensary",
    icon: <Stethoscope className="ecosystem-card-icon" />,
    description: "A free dispensary is started in Asia's biggest Autonagar, Vijayawada, to provide first aid to 80,000 workers employed in Autonagar at times of need.",
    stats: "Serving 80,000+ workers",
    details: "Located in Autonagar, Vijayawada",
    awards: null
  },
  {
    title: "Educational Scholarships",
    icon: <GraduationCap className="ecosystem-card-icon" />,
    description: "Inception of Education Scholarships to blood relatives of agents, employees and hamalies of Navata Road Transport. It is implemented to support and encourage education as cherished by our founder.",
    stats: "Rs.1.20 Crore awarded to 7,467 students",
    details: "From 7th class to Post Graduation level",
    awards: null,
  },
  {
    title: "PSC Bose Memorial Driving School",
    icon: <Car className="ecosystem-card-icon" />,
    description: "The trust runs a driving school with the motto 'Come with a uniform and leave as a driving professional'. Located on NH 9, at Munagacherla Village near Nandigama.",
    stats: "108 acres driving track",
    details: "World class facilities with free training, lodging and boarding",
    awards: ["IRTE Award", "Prince Michael International Road Safety Award (UK) - 2005"]
  }
];

const sisterConcerns = [
  {
    name: "P.S.C BOSE AUTOMOBILES",
    established: "1957",
    description: "The modern 'Bose Workshop' in Vijayawada handles the entire fleet servicing and maintenance with best practices.",
    website: "http://www.pscbam.com/",
    icon: <Building2 className="ecosystem-card-icon" />,
    image: "/images/Ecosystem/pscbose-automobiles.jpg"
  },
  {
    name: "RAVI RAYS",
    established: "1984",
    description: "Two retail outlets of Indian Oil Corporation Limited in and around Visakhapatnam with highest sales record.",
    website: "http://www.ravirays.in",
    icon: <Building2 className="ecosystem-card-icon" />,
    image: "/images/Ecosystem/ravirays.jpg"
  },
  {
    name: "P.S.B.INDUSTRIES",
    established: "1996",
    description: "A franchise of MRF tyre retreading in Visakhapatnam, well known for its standards.",
    website: null,
    icon: <Building2 className="ecosystem-card-icon" />,
    image: "/images/Ecosystem/mrf.jpg"
  },
  {
    name: "P.S.C.BOSE AUTOMOTIVES",
    established: "2003",
    description: "IOCL retail outlet at Visakhapatnam bypass road, Sontyam.",
    website: null,
    icon: <Building2 className="ecosystem-card-icon" />,
    image: "/images/Ecosystem/pscboseautomotives.jpg"
  }
];


const Ecosystem = () => (
  <div className="ecosystem-section">
    {/* Social Responsibility Section */}
    <AnimateOnScroll className="animate-fade-in">
      <h2 className="ecosystem-section-title">Our Social Responsibilities</h2>
    </AnimateOnScroll>
    <div className="ecosystem-card-grid">
      {socialResponsibilityData.map((item, idx) => (
        <AnimateOnScroll key={idx} className="animate-fade-up" delay={idx * 100}>
          <div className="ecosystem-card">
            <div className="ecosystem-card-content">
              <div className="ecosystem-card-icon-wrapper">{item.icon}</div>
              <div className="ecosystem-card-main">
                <div className="ecosystem-card-title">{item.title}</div>
                <div className="ecosystem-card-desc">{item.description}</div>
                {item.stats && (
                  <div className="ecosystem-card-feature">
                    <span className="ecosystem-card-check">✓</span>
                    <span>{item.stats}</span>
                  </div>
                )}
                {item.details && (
                  <div className="ecosystem-card-feature">
                    <span className="ecosystem-card-check">✓</span>
                    <span>{item.details}</span>
                  </div>
                )}
                {item.awards && (
                  <div className="ecosystem-card-feature">
                    <Award className="mr-1" />
                    <span>{item.awards.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  
    {/* Sister Concerns Section */}
    <AnimateOnScroll className="animate-fade-in">
       <h2 className="ecosystem-section-title">Our Sister Concerns</h2>
    </AnimateOnScroll>
    <div className="ecosystem-sister-grid">
      {sisterConcerns.map((concern, idx) => (
        <AnimateOnScroll key={idx} className="animate-fade-in" delay={idx * 100}>
          <div className="ecosystem-card">
            <div className="ecosystem-card-content">
              <div className="ecosystem-card-icon-wrapper">{concern.icon}</div>
              <div className="ecosystem-card-main">
                <div className="ecosystem-card-title">{concern.name}</div>

                <div className="ecosystem-card-image-wrapper"> {/* Added a wrapper for positioning context */}
                  {concern.image && (
                    concern.website ? (
                      <a
                        href={concern.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${concern.name} website`}
                      >
                        <Image
                          src={concern.image}
                          alt={concern.name}
                          fill
                          className="ecosystem-card-img"
                        />
                      </a>
                    ) : (
                      <Image
                        src={concern.image}
                        alt={concern.name}
                        fill
                        className="ecosystem-card-img"
                      />
                    )
                  )}
                </div>

                <div className="ecosystem-card-desc">{concern.description}</div>
                <div className="ecosystem-card-feature">
                  <Users className="mr-2" />
                  <span>Since {concern.established}</span>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>   
  </div>
);

export default Ecosystem;