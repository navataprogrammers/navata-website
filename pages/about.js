import React from 'react';
import '../styles/AboutUs.css'; 
import AnimateOnScroll from '../components/AnimateonScroll';
import FounderSection from '../components/Aboutus/FounderSection';
import VisionMissionSection from '../components/Aboutus/VisionMissionSection';
import TeamValuesSection from '../components/Aboutus/TeamValuesSection';
import MilestonesSection from '../components/Aboutus/MilestonesSection';
import AchievementsSection from '../components/Aboutus/AchievementsSection';

const AboutUsPage = ({ achievements, milestones }) => {
  return (
    <div className="about-us-container">
      <section className="aboutus-section">
         <div className="hero-image"></div>
        <div className="franchise-hero-circles" /> 
        <div className="aboutus-content">
          <AnimateOnScroll className="scroll-animate" delay={200}>
            <h1 className="aboutus-title">About Navata Road Transport</h1>
            <div className="text-overlay">
              <p className="aboutus-subtitle">
                Serving India with a vast network of road transport solutions, 
                we specialize in safe, reliable, efficient logistics and
                ensure seamless deliveries powered by technology and trust.
                With intense reachability through tier -1 to tier-3 locations 
                and all major cities and towns,Navata places a pivotal role in 
                enabling major customers to reach out and expand their business network.         
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
 
      <FounderSection />
      <VisionMissionSection />
      <TeamValuesSection />
      <AchievementsSection achievements={achievements} />
      <MilestonesSection milestones={milestones} />
    </div>
  );
};

export async function getStaticProps() {
  const achievements = [
    { image: '/images/Accolades/FAPCCI-award.webp', title: 'FAPCCI Award 2005-2006', description: 'Excellence award from The Federation of Andhra Pradesh Chambers of Commerce and Industry for our performance.' },
    { image: '/images/Accolades/road-safety-award.webp', title: 'IRTE Prince Michael International Road Safety Award 2006', description: 'A prestigious international award from the UK recognizing our commitment to promoting road safety.' },
    { image: '/images/Accolades/mahindra-award.webp', title: 'Mahindra Transport Excellence Award 2013', description: 'Awarded for achieving excellence in transport services, safety, and customer satisfaction.' },
    { image: '/images/Accolades/jrd-award.webp', title: 'JRD Best Entrepreneurs Award 2015', description: 'Honoring our founder\'s vision and the company\'s entrepreneurial spirit in driving business growth and innovation.' }
  ];

  const milestones = [
    { year: '1956', event: 'Founder established "Bose Work Shop" in Vijayawada' },
    { year: '1982', event: 'Inception of NAVATA with 46 branches, 17 vehicles and 65 staff members' },
    { year: '1992', event: 'NAVATA grows to 307 branches, 131 vehicles and 900 staff members' },
    { year: '1996', event: 'Parvataneni Subhaschandra Bose Memorial Trust founded' },
    { year: '1998', event: 'Free Dispensary started to serve Autonagar workers' },
    { year: '2000', event: 'Operations expanded to Karnataka' },
    { year: '2001', event: 'PSC Bose Memorial Driving School is started. Extensive expansion in Tamilnadu is undertaken.' },
    { year: '2002', event: 'ISO 9001:2000 certification achieved' },
    { year: '2007', event: 'NAVATA scales new heights in growth with patronage of its customers' },
    { year: '2014', event: 'ISO 9001:2008 certification achieved' },
    { year: '2018', event: 'ISO 9001:2015 certification achieved' }
  ];

  return {
    props: {
      achievements,
      milestones,
    },
  };
}

export default AboutUsPage;