import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimateOnScroll from "../components/AnimateonScroll";
import "../styles/Media.css";

const MediaPage = ({ mediaData }) => {
  return (
    <div className="media-container">
      {/* Hero Section */}
      <div className="media-hero">
        <div className="media-hero-image-container">
          <Image
            src="/images/press-release.jpg"
            alt="Media Page"
            width={1000}
            height={1000}
            className="media-hero-bg"
            priority
          />
        </div>
        <div className="media-hero-content">
          <AnimateOnScroll>
            <h1 className="media-title">Media & Press</h1>
            <div className="text-overlay">
              <p className="media-subtitle">
                Stay updated with the latest news and announcements
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Cards Section */}
      <AnimateOnScroll>
        <div className="media-cards">
          {mediaData.map((item) => (
            <motion.div
              key={item.id}
              className="media-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="media-image-wrapper">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="media-image"
                />
              </div>

              <div className="media-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-btn"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimateOnScroll>
    </div>
  );
};

export async function getStaticProps() {
  const mediaData = [
    {
      id: 1,
      title: "Industry Outlook Award 2022",
      description:
        "Recognized as the Best Logistics Service Provider of the Year for our outstanding contribution to the industry.",
      image: "/images/navata-road-transport.jpg",
      link: "/images/media_page/Navata_IndustryOutlook_certificate.pdf",
    },
    {
      id: 2,
      title: "Featured in Business Connect",
      description:
        "Recognized by Business Connect for redefining logistics excellence with customer-centric services and technology-driven solutions across India.",
      image: "/images/media_page/Business_Connect.jpeg",
      link: "https://issuu.com/fanzineindia/docs/india_s_great_workplaces_to_shape_your_career_in_2",
    },
    {
      id: 3,
      title: "Times Of India - Viksit Bharat ",
      description:
        "Highlighted in the Times of India’s ‘Viksit Bharat’ feature for contributing to India’s growth story through reliable, sustainable, and nationwide logistics operations.",
      image: "/images/media_page/TOI.jpg",
      link: "/images/media_page/NAVATA_TOI.pdf",
    },
    {
      id: 4,
      title: "Featured in Forbes",
      description: 
       "Recognized by Forbes as Promising brands in India",
      image:"/images/media_page/forbes.png",
      link: "/images/media_page/Forbes Listed.htm",

    },
  ];

  return {
    props: {
      mediaData,
    },
  };
}

export default MediaPage;