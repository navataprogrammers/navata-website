import React from 'react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import AnimateOnScroll from '../AnimateonScroll';

const FounderSection = () => {
  return (
    <section className="section founder-section">
      <div className="section-container founder-grid">
        <AnimateOnScroll className="scroll-animate-left">
          <div>
            <h2 className="section-title founder-title">Our Founder&apos;s Legacy</h2>
            <div className="founder-card">
              <p className="founder-text">
                A great visionary, philanthropist and an iconic proof of ‘what a
                common man fired by the spirit of enterprise and driven by 
                determination can achieve in his own lifetime,Sri Parvataneni Subhas Chandra Bose is
                noted for his adherence to the value investing philosophy.
                He started his career as a mechanic. Immense struggle and
                continued support from his brothers Sri Sukhadev and Sri
                Venkata Koteswara Rao enabled him to start own workshop in
                1956, laying foundation to a group that is currently an
                employer of thousands of employees. The trio ventured in
                transportation through Navata in 1982.
              </p>
              <div className="founder-date">
                <Calendar className="w-6 h-6" />
                <span>Legacy Lives On</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll className="scroll-animate-right">
          <div className="founder-image-wrapper">
            <div className="founder-image-bg">
              <div className="founder-image-inner">
                <Image 
                  src='/images/founder.webp' 
                  alt="Founder" 
                  className='founder-image-pic' 
                  width={304}
                  height={304}
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FounderSection;