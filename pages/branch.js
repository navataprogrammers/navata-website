import React, { useState, useEffect, useRef } from "react";
import { fetchStations } from "../lib/FetchStations"
import "../styles/Branch.css"; 
import Image from 'next/image';
import {
  MapPin,
  Search,
  Building,
  Map,
  Phone,
  Mail,
  Landmark
} from "lucide-react";

const LocationSearch = () => {
  const [input, setInput] = useState("");
  const [allStations, setAllStations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [branchDetails, setBranchDetails] = useState([]);
  const [nearestBranches, setNearestBranches] = useState([]);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const suggestionsRef = useRef(null);
  const isPincode = (text) => /^\d{6}$/.test(text.trim());

  useEffect(() => {
    const loadStationsOnce = async () => {
      if (input.length === 1 && !isPincode(input) && allStations.length === 0) {
        const stations = await fetchStations();
        setAllStations(stations);
      }
    };
    loadStationsOnce();
  }, [input, allStations]);

  useEffect(() => {
    if (!isPincode(input) && input.length > 0 && showSuggestions) {
      const lowerInput = input.toLowerCase();
      const filtered = allStations.filter((station) => {
        const name = station.StnName.trim().toLowerCase();
        const parts = name.split('-').map((p) => p.trim());
        return parts.some((part) => part.startsWith(lowerInput));
      });
      setSuggestions(filtered);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
    }
  }, [input, allStations, showSuggestions]);

  const handleSearch = async () => {
    setShowSuggestions(false);
    setError("");
    setSuggestions([]);
    setActiveIndex(-1);
    setBranchDetails([]);
    setNearestBranches([]);

    const currentInput = input.trim().toLowerCase();

    try {
      if (isPincode(currentInput)) {
        const res = await fetch(
          `https://online.navata.com/SENDMAIL/searchbypincode.jsp?pincode=${currentInput}`
        );
        const data = await res.json();
        data.length > 0
          ? setBranchDetails(data)
          : setError("No branch found for this pincode.");
      } else {
        const [branchRes, nearbyRes] = await Promise.all([
          fetch(
            `https://online.navata.com/SENDMAIL/stnaddressjson.jsp?wbstdets=${currentInput}`
          ),
          fetch(
            `https://online.navata.com/SENDMAIL/nrststnaddressjson.jsp?stanid=${currentInput}`
          )
        ]);

        const branchData = await branchRes.json();
        const nearbyData = await nearbyRes.json();

        if (branchData.length > 0) setBranchDetails(branchData);
        if (nearbyData.length > 0) setNearestBranches(nearbyData);

        if (branchData.length === 0 && nearbyData.length === 0) {
          setError("No branch found with this name.");
        }
      }
    } catch (err) {
      setError("Failed to fetch branch details.");
    }
  };

  const handleSuggestionClick = (name) => {
    const cleanName = name.trim();
    setInput(cleanName);
    setSuggestions([]);
    setShowSuggestions(false);
    fetchBranchDetailsByName(cleanName);
  };

  const fetchBranchDetailsByName = async (name) => {
    setError("");
    setBranchDetails([]);
    setNearestBranches([]);
    try {
      const [branchRes, nearbyRes] = await Promise.all([
        fetch(
          `https://online.navata.com/SENDMAIL/stnaddressjson.jsp?wbstdets=${name}`
        ),
        fetch(
          `https://online.navata.com/SENDMAIL/nrststnaddressjson.jsp?stanid=${name}`
        )
      ]);
      const branchData = await branchRes.json();
      const nearbyData = await nearbyRes.json();

      if (branchData.length > 0) setBranchDetails(branchData);
      if (nearbyData.length > 0) setNearestBranches(nearbyData);

      if (branchData.length === 0 && nearbyData.length === 0) {
        setError("No branch found.");
      }
    } catch (err) {
      setError("Error fetching branch.");
    }
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          handleSuggestionClick(suggestions[activeIndex].StnName);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setSuggestions([]);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && activeIndex >= 0 && activeIndex < suggestions.length) {
      const activeItem = suggestionsRef.current.children[activeIndex];
      activeItem?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const renderBranchCard = (branch) => (
    <div key={branch.StnId} className="branch-card">
      <p><strong><MapPin size={16} /> Branch:</strong> {branch.StnName}</p>
      <p>
        <strong>
          <Landmark size={16} style={{ marginRight: '0.3em' }} /> Address:
        </strong>
        <span className="address-value">{branch.Address}</span>
      </p>
      <p><strong><Building size={16} /> City:</strong> {branch.CityName}</p>
      <p><strong><Map size={16} /> State:</strong> {branch.StateName}</p>
      <p><strong><MapPin size={16} /> Pincode:</strong> {branch.Pincode}</p>
      <p><strong><Phone size={16} /> Phone:</strong> {branch.PhoneNo}</p>
      <p><strong><Mail size={16} /> Email:</strong> {branch.MailId}</p>
      <p>
        <strong>
          <a
            href={`https://maps.google.com/?q=${branch.Latitude},${branch.Longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </strong>
      </p>
    </div>
  );

  return (
    <div className="location-search-container">
      <div className="branch-banner">
        <Image
          src="/images/branch.webp"
          alt="Illustration of branch search background"
          className="branch-bg-img"
          fill 
          style={{ objectFit: 'cover' }} 
          priority 
        />
        <div className="search-section">
          <h2>
            Locate Us <Search size={22} style={{ marginRight: "6px" }} />
          </h2>
          <p>Search for our nearest branch or head office location</p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Branch Name or Pincode"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>
              <MapPin size={18} style={{ marginRight: "4px" }} /> Search
            </button>
            {suggestions.length > 0 && showSuggestions && (
              <ul className="suggestions" ref={suggestionsRef}>
                {suggestions.map((station, index) => (
                  <li
                    key={station.StnId}
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => handleSuggestionClick(station.StnName)}
                  >
                    {station.StnName.trim()} ({station.StnId})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {(branchDetails.length > 0 || nearestBranches.length > 0) && (
        <div className="branch-details">
          <h3>
            <Building size={20} style={{ marginRight: "6px" }} /> Branch Details
          </h3>
          <div className="branch-details-grid">
            {branchDetails.map(renderBranchCard)}
            {nearestBranches.map(renderBranchCard)}
          </div>
        </div>
      )}

      <div className="bottom-section">
        <div className="head-office">
          <h2>
            <Landmark size={20} style={{ marginRight: "6px" }} /> Head Office
          </h2>
          <div className="head-office-card">
            <p>
              <strong>Address:</strong> D.NO.18-667, BOSE BUILDINGS, KANURU, <br />
              VIJAYAWADA - 520007, ANDHRA PRADESH.
            </p>
            <p><strong>Email:</strong> navata@navata.com</p>
            <p><strong>Phone:</strong> 0866-6638787, 9248094455</p>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.467484258838!2d80.6865268759178!3d16.502800827254586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb4a4b8a4f0f%3A0x2fe23f64c622557!2sNavata%20Transport%20Head%20Office!5e0!3m2!1sen!2sin!4v1726809886475!5m2!1sen!2sin"
            title="Map"
            loading="lazy"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;