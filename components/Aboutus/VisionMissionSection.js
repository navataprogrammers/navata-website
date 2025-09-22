import React from 'react';
import { Eye, Target } from 'lucide-react';
import AnimateOnScroll from '../AnimateonScroll';

const VisionMissionSection = () => {
  return (
    <section className="section vision-mission-section">
      <div className="section-container">
        <AnimateOnScroll className="scroll-animate">
          <h2 className="vision-mission-title">Vision & Mission</h2>
          <p className="section-subtitle vision-mission-subtitle">
            Driving towards a future of excellence in transportation services
          </p>
        </AnimateOnScroll>
        <div className="vision-mission-grid">
          <AnimateOnScroll className="scroll-animate-left">
            <div className="vision-mission-card vision-card">
              <div className="vision-mission-icon-wrapper vision-icon-bg">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="vision-mission-card-title">Vision</h3>
              <p className="vision-mission-card-text">
                To establish our presence in remote corners of India with our vast 
                network by providing complete transport solutions without compromising 
                on Service Quality and Business Ethics.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll className="scroll-animate-right" delay={200}>
            <div className="vision-mission-card mission-card">
              <div className="vision-mission-icon-wrapper mission-icon-bg">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="vision-mission-card-title">Mission</h3>
              <p className="vision-mission-card-text">
                Committed to maintain high quality services in tune with changing needs 
                of our customers while maintaining standards in the transport sector and
                enhancing brand equity.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;