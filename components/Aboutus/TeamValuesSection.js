import React from 'react';
import AnimateOnScroll from '../AnimateonScroll';

const TeamValuesSection = () => {
  return (
    <section className="team-values-section section" style={{ overflowX: 'auto' }}>
      <div className="section-container">
        <AnimateOnScroll className="scroll-animate">
          <h2 className="team-values-title">Our Team Values</h2>
          <p className="team-values-subtitle section-subtitle">
            The qualities we believe in and embody as a team
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll className="scroll-animate-right" delay={200}>
          <div className="team-values-row">
            <div className="team-value-card">
              <div className="team-value-card-icon">🤝</div>
              <h3 className="value-card-title">Collaboration</h3>
              <p className="value-card-description">
                Achieving together, supporting each other always.
              </p>
            </div>
            {/* ... other team value cards ... */}
            <div className="team-value-card">
              <div className="team-value-card-icon">🌟</div>
              <h3 className="value-card-title">Integrity</h3>
              <p className="value-card-description">
                Honesty and transparency in all we do.
              </p>
            </div>
            <div className="team-value-card">
              <div className="team-value-card-icon">🌱</div>
              <h3 className="value-card-title">Growth</h3>
              <p className="value-card-description">
                Continuous improvement and learning.
              </p>
            </div>
            <div className="team-value-card">
              <div className="team-value-card-icon">💡</div>
              <h3 className="value-card-title">Customer Focus</h3>
              <p className="value-card-description">
                Putting our customers at the center.
              </p>
            </div>
            <div className="team-value-card">
              <div className="team-value-card-icon">🛡️</div>
              <h3 className="value-card-title">Accountability</h3>
              <p className="value-card-description">
                Owning our actions and results.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TeamValuesSection;