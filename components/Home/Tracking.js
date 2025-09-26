"use client";
import React, { useState, useEffect } from "react";
import { Barcode, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
// Base styles (required)
import "react-datepicker/dist/react-datepicker.css";
// Your custom styles that override the base
import "../../styles/Tracking.css";

const Tracking = ({ initialData, onSubmit, isLoading }) => {
  const [waybillno, setWaybillno] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setWaybillno(initialData.waybillno || "");
      setDate(initialData.date ? new Date(initialData.date) : null);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!waybillno || !date) {
      setError("Please fill in all fields.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    onSubmit({ waybillno, date });
  };

  return (
    <div className="track-container">
      <form className="track-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Barcode />
          <input
            type="text"
            placeholder="Waybill No (Eg:A012345)"
            value={waybillno}
            onChange={(e) => setWaybillno(e.target.value.toUpperCase())}
          />
        </div>
        <div className="input-group">
          <Calendar />
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date (DD/MM/YYYY)"
            autoComplete="off"
            showMonthDropdown
            // Make sure these 3 props are present for the year dropdown
            showYearDropdown
            yearDropdownItemNumber={15}
            scrollableYearDropdown
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Tracking..." : "Track"}
        </button>
      </form>
      {error && <div className="popup error">{error}</div>}
    </div>
  );
};

export default Tracking;