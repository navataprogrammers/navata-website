import React from 'react';
import Image from 'next/image';
import AnimateOnScroll from '../AnimateonScroll';

// passing the `achievements` array as a prop
const AchievementsSection = ({ achievements }) => {
  return (
    <section className="section achievements-section">
      <div className="section-container">
        <AnimateOnScroll className="scroll-animate">
          <h2 className="achievements-title">Our Accolades</h2>
          <p className="section-subtitle achievements-subtitle">
            Recognized for excellence, safety, and reliability in the transport sector.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll className="scroll-animate">l
          <div className="achievements-scroll-container">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                 <Image
                  src={achievement.image}
                  alt={achievement.title}
                  className="achievement-image"
                  width={320}
                  height={200}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e0e0e0/ffffff?text=Image+Not+Found'; }}
                />
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AchievementsSection;