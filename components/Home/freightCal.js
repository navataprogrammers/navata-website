"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import FreightForm from "./Freightform";
import { fetchStations } from "../../lib/FetchStations"

// Initial state for the form fields
const initialState = { source: "", destination: "", articles: "", goodsValue: "", weight: "", passType: "" };

const FreightCalculatorPage = () => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState(initialState);
  const [autoState, setAutoState] = useState({
    source: { search: "", options: [], show: false, highlighted: -1 },
    destination: { search: "", options: [], show: false, highlighted: -1 }
  });
  const [stations, setStations] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  // --- DATA FETCHING ---
  // Fetches the list of stations when the component first loads
  useEffect(() => {
    fetchStations()
      .then(setStations)
      .catch(() => setError("Failed to load stations."));
  }, []);

  // --- FORM HANDLERS ---
  const getFilteredStations = (keyword) =>
    keyword.trim()
      ? stations.filter((s) => s.StnName.trim().toLowerCase().startsWith(keyword.trim().toLowerCase())).slice(0, 20)
      : [];

  const handleAutoInput = (field, value) => {
    setAutoState((prev) => ({
      ...prev, [field]: { ...prev[field], search: value, options: getFilteredStations(value), show: true, highlighted: -1 }
    }));
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const selectStation = (field, station) => {
    setAutoState((prev) => ({ ...prev, [field]: { ...prev[field], search: station.StnName.trim(), show: false } }));
    setFormData((prev) => ({ ...prev, [field]: station.StnId }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Restored keyboard navigation logic
  const handleKeyDown = (field, e) => {
    const { highlighted, options } = autoState[field];
    if (!options.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAutoState((prev) => ({
        ...prev, [field]: { ...prev[field], highlighted: (highlighted + 1) % options.length }
      }));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAutoState((prev) => ({
        ...prev, [field]: { ...prev[field], highlighted: (highlighted - 1 + options.length) % options.length }
      }));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      selectStation(field, options[highlighted]);
    } else if (e.key === "Escape") {
      setAutoState((prev) => ({ ...prev, [field]: { ...prev[field], show: false } }));
    }
  };

  // --- API CALL LOGIC ---
  const handleApiCallOnSubmit = useCallback(async (dataToSubmit) => {
    const { source, destination, articles, goodsValue, weight, passType } = dataToSubmit;
    if (!source || !destination || !articles || !goodsValue || !weight || !passType) {
      setError("Please fill in all fields.");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    const apiUrl = `https://online.navata.com/SENDMAIL/frtenqjson.jsp?bkfrtdets=${source}:${destination}:${articles}:${goodsValue}:${weight}:${passType}`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const apiData = await res.json();

      if (apiData?.length > 0 && apiData[0].Freight) {
        setResult(apiData[0]);
        // Clear the form on a successful API call
        setFormData(initialState);
        setAutoState({
          source: { search: "", options: [], show: false, highlighted: -1 },
          destination: { search: "", options: [], show: false, highlighted: -1 }
        });
      } else {
        setError(apiData?.[0]?.Status || "No details returned from API.");
      }
    } catch (err) {
      setError(err.message.includes('JSON') ? "Invalid response from server." : `Network error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array because it doesn't depend on component state

  // --- INITIAL LOAD LOGIC ---
  // Runs once on page load if there are URL parameters
  useEffect(() => {
    const source = searchParams.get('source');
    if (source) {
      const initialLoadData = {
        source,
        destination: searchParams.get('destination') || "",
        articles: searchParams.get('articles') || "",
        goodsValue: searchParams.get('goodsValue') || "",
        weight: searchParams.get('weight') || "",
        passType: searchParams.get('passType') || "",
      };
      
      setFormData(initialLoadData);
      setAutoState(prev => ({ ...prev, 
        source: { ...prev.source, search: searchParams.get('sourceName') || "" },
        destination: { ...prev.destination, search: searchParams.get('destName') || "" },
      }));
      
      handleApiCallOnSubmit(initialLoadData);
    }
  }, [searchParams, handleApiCallOnSubmit]);


  // --- RENDER ---
  return (
    <div className="freight-container">
      <FreightForm
        // Pass all state and handlers down to the child form component
        formData={formData}
        autoState={autoState}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleAutoInput={handleAutoInput}
        selectStation={selectStation}
        handleKeyDown={handleKeyDown}
        onSubmit={() => handleApiCallOnSubmit(formData)}
      />

      {error && <div className="freight-error">{error}</div>}

      {result && (
        <div className="freight-results">
          <h4>Freight Details</h4>
          <div className="result-grid">
            {["Freight", "Handling", "SurCharge", "Incidental", "CityCharge", "ArticleCharge", "STax", "BillAmt", "Total"].map((key) => (
              <div className="result-item" key={key}>
                <strong>{key}:</strong>
                <span>₹ {result[key] || 0}</span>
              </div>
            ))}
          </div>
          {result.Status && <div className="result-status"><strong>Status:</strong> {result.Status}</div>}
        </div>
      )}
    </div>
  );
};

export default FreightCalculatorPage;