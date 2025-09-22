import React, {memo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimateOnScroll from '../AnimateonScroll';

//  passing the `milestones` array as a prop
const MilestonesSection = ({ milestones }) => {
  const [currentMilestone, setCurrentMilestone] = useState(0);
  
  const handlePrevMilestone = () => {
    setCurrentMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
  };
  const handleNextMilestone = () => {
    setCurrentMilestone((prev) => (prev + 1) % milestones.length);
  };

  const getCarouselItemClassName = (index) => {
    const offset = index - currentMilestone;
    if (offset === 0) return 'is-active';
    if (offset === 1 || offset === -(milestones.length - 1)) return 'is-next';
    if (offset === -1 || offset === (milestones.length - 1)) return 'is-prev';
    if (offset > 1) return 'is-far-next';
    if (offset < -1) return 'is-far-prev';
    return '';
  };

  return (
    <section className="section milestones-section">
      <div className="section-container">
        <AnimateOnScroll className="scroll-animate">
          <h2 className="milestones-title">Our Journey</h2>
          <p className="section-subtitle milestones-subtitle">
            Key milestones that shaped our growth and success
          </p>
        </AnimateOnScroll>
        <div className="journey-carousel">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`milestone-carousel-item ${getCarouselItemClassName(index)}`}
            >
              <div className="milestone-card">
                <div className="milestone-year">{milestone.year}</div>
                <p className="milestone-event">{milestone.event}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="journey-navigation">
          <button className="journey-nav-button" onClick={handlePrevMilestone} aria-label="Previous Milestone">
            <ChevronLeft />
          </button>
          <div className="journey-dots">
            {milestones.map((_, index) => (
              <button
                key={index}
                className={`journey-dot ${currentMilestone === index ? 'active' : ''}`}
                onClick={() => setCurrentMilestone(index)}
                aria-label={`Go to milestone ${index + 1}`}
              />
            ))}
          </div>
          <button className="journey-nav-button" onClick={handleNextMilestone} aria-label="Next Milestone">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(MilestonesSection); // React.memo to prevent unnecessary re-renders