import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NewFranchiseForm from "../components/franchise/NewFranchiseForm";
import AnimateOnScroll from "../components/AnimateonScroll";
import FranchiseInquiryModal from "../components/franchise/FranchiseInquiryModal";
import "../styles/Franchise.css";
import LocateTrackButtons from "../components/LocateTrackbuttons";

const FranchisePage = ({ initialFranchises, initialStates }) => {
  const [selectedState, setSelectedState] = useState("All");
  const [filteredFranchises, setFilteredFranchises] = useState(initialFranchises);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
  const filtered =
    selectedState === "All"
      ? initialFranchises
      : initialFranchises.filter((f) => {
          const stateName = f.franchise.split(/\s*-\s*/)[0].trim();
          return stateName === selectedState;
        });
  setFilteredFranchises(filtered);
}, [selectedState, initialFranchises]);

  return (
    <div className="franchise-global">
      {/* Hero Section */}
      <section className="franchise-hero">
        <LocateTrackButtons />
        <div className="franchise-hero-image-container">
            <Image
                src="/images/franchise.png"
                alt="Franchise opportunities"
                width={1920}
                height={600}
                priority
                className="franchise-bg-img"
            />
        </div>
        <div className="franchise-hero-content">
          <AnimateOnScroll className="scroll-animate" delay={200}>
            <h1 className="franchise-hero-title">
              Drive Your Future with a Navata Franchise
            </h1>
              <p className="franchise-hero-desc">
                We are expanding and looking for dedicated partners to grow with
                us. Explore available opportunities and start your journey
                today.
              </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="franchise-opp-list" className="franchise-opps-wrap">
        <div className="franchise-opps-header">
          <AnimateOnScroll className="scroll-animate" delay={200}>
            <h2 className="franchise-opps-title">Available Opportunities</h2>
            <p className="franchise-opps-desc">
              Find an available franchise opportunity near you. Select a state
              to filter the locations.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Filter dropdown */}
        <div className="franchise-opps-filter-wrap">
          <div className="franchise-opps-select-wrap">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="franchise-opps-select"
            >
              {initialStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <span className="franchise-opps-dropdown">
              <ChevronDown size={22} />
            </span>
          </div>
        </div>

        {/* Franchise list */}
        <div className="franchise-opps-grid">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-franchise-skeleton">
                <div className="card-image-wrap-skeleton"></div>
                <div className="franchise-card-content">
                  <div className="navata-skeleton navata-skel-title"></div>
                  <div className="navata-skeleton navata-skel-line"></div>
                  <div className="navata-skeleton navata-skel-line"></div>
                  <div className="navata-skeleton navata-skel-line"></div>
                  <div className="navata-skeleton navata-skel-btn"></div>
                </div>
              </div>
            ))
          ) : filteredFranchises.length > 0 ? (
            filteredFranchises.map((franchise, idx) => (
              <AnimateOnScroll key={idx} delay={100}>
                <div className="franchise-card">
                  <div className="franchise-card-content">
                    <h3 className="franchise-card-title">
                      {franchise.franchise}
                    </h3>
                    <p className="franchise-card-state">{franchise.location}</p>
                    <button
                      className="franchise-card-inquire"
                      onClick={() => {
                        setSelectedFranchise(franchise);
                        setIsModalOpen(true);
                      }}
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            ))
          ) : (
            <div className="franchise-no-opps">
              <p>No opportunities found for {selectedState}.</p>
              <span>
                Please select another state or request a new location below.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Request Section */}
      <AnimateOnScroll className="scroll-animate" delay={200}>
        <NewFranchiseForm />
      </AnimateOnScroll>

      {/* Pop up Modal */}
      <FranchiseInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        franchiseName={selectedFranchise?.franchise}
        franchiseLocation={selectedFranchise?.location}
      />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch(
      "https://online.navata.com/SENDMAIL/jobopeningstofranchise.jsp?cjflag=F"
    );
    const data = await res.json();

    const sortedData = data?.franchises
      ? [...data.franchises].sort((a, b) =>
          a.franchise.localeCompare(b.franchise)
        )
      : [];

    const stateList = [
      "All",
      ...new Set(sortedData.map((f) => f.franchise.split(/\s*-\s*/)[0].trim())),
    ];

    return {
      props: {
        initialFranchises: sortedData,
        initialStates: stateList,
      },
      revalidate: 3600, // ISR every hour
    };
  } catch (error) {
    console.error("Failed to fetch franchises:", error);
    return {
      props: { initialFranchises: [], initialStates: ["All"] },
    };
  }
}

export default FranchisePage;