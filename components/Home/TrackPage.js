"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Tracking from "./Tracking"; 

const parseDateFromURL = (dateStr) => {
  if (!dateStr || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return null;
  const [day, month, year] = dateStr.split('/');
  // Note: month is 0-indexed in JavaScript Date, so we subtract 1
  return new Date(year, month - 1, day);
};

const TrackPage = () => {
  const [initialData, setInitialData] = useState({ waybillno: "", date: null });
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

    const formattedDate = `${String(data.date.getDate()).padStart(2, "0")}/${String(
      data.date.getMonth() + 1
    ).padStart(2, "0")}/${data.date.getFullYear()}`;
    
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
  // Reset form after every page refresh
  setInitialData({ waybillno: "", date: null });
  }, []);

  return (
    <div className="track-page-container">
      <div className="track-container">
        <Tracking
          initialData={initialData}
          onSubmit={handleTrackSubmit}
          isLoading={loading}
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