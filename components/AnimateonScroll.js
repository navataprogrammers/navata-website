import React, { useState, useEffect } from 'react';

// Custom Hook
const useIntersectionObserver = (options) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // observe once
      }
    }, options);

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

// AnimateOnScroll Component
const AnimateOnScroll = ({ children, className = '', threshold = 0.1, delay = 0 }) => {
  const [setRef, isVisible] = useIntersectionObserver({ threshold });
  return (
    <div
      ref={setRef}
      className={`${className} animate-fade-up ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
export default AnimateOnScroll;
