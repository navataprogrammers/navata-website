"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Tracking
 from "./Tracking";
// Helper to format date for the API
const formatDateForAPI = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'numeric', year: 'numeric',
  }).format(date);
};

const TrackPage = () => {
  const [formData, setFormData] = useState({ waybillno: "", date: "" });
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  const handleTrackSubmit = useCallback(async (data) => {
    if (!data.waybillno || !data.date) {
      setError("Please fill all fields.");
      setTrackingData(null);
      return;
    }

    setError(null);
    setLoading(true);
    setTrackingData(null);

    const formattedDate = formatDateForAPI(data.date);
    const queryParam = `${data.waybillno}:${formattedDate}`;

    try {
      const res = await fetch(`https://online.navata.com/SENDMAIL/wbtrackjson.jsp?wbstdets=${queryParam}`);
      if (!res.ok) throw new Error("Network response was not ok.");
      const apiData = await res.json();

      if (!Array.isArray(apiData) || apiData.length === 0 || !apiData[0].WbillNo) {
        throw new Error("No tracking data found for the provided details.");
      }

      setTrackingData(apiData[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const waybillno = searchParams.get('waybillno');
    const date = searchParams.get('date');

    if (waybillno && date) {
      const initialData = { waybillno, date };
      setFormData(initialData);
      handleTrackSubmit(initialData);
    }
  }, [searchParams, handleTrackSubmit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  return (
    <div className="track-page-container">
      <h1>Track Your Shipment</h1>
      <div className="track-container">
        <Tracking
          formData={formData}
          setFormData={setFormData}
          isLoading={loading}
          onSubmit={() => handleTrackSubmit(formData)}
        />
      </div>

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="popup error">{error}</div>}
      
      {trackingData && (
        <div className="timeline-container">
          <h3>Tracking Details</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon">📦</div>
              <div className="timeline-content">
                <p><strong>Waybill No:</strong> {trackingData.WbillNo}</p>
                <p><strong>Booking Date:</strong> {trackingData.BookDate}</p>
                <p><strong>Pay Type:</strong> {trackingData.PayType}</p>
                <p><strong>From:</strong> {trackingData.FromName} ({trackingData.FromStn})</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🚚</div>
              <div className="timeline-content">
                <h4><strong>Status:</strong> {trackingData.WbStatus}</h4>
                <p><strong>To:</strong> {trackingData.ToName} ({trackingData.ToStn})</p>
                <p><strong>Delivery Date:</strong> {trackingData.DelDate || "Not Delivered Yet"}</p>
                {trackingData.PayType?.toUpperCase() === "TO-PAY" && trackingData.CrNo && (
                  <p><strong>Cash Receipt No:</strong> {trackingData.CrNo}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPage;