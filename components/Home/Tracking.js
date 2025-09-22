"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Barcode, Calendar } from "lucide-react";
import "../../styles/Tracking.css";

const Tracking = () => {
  const [waybillno, setWaybillno] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!waybillno || !date) {
      setError("Please fill in all fields.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    const params = new URLSearchParams({ waybillno, date });
    router.push(`/track?${params.toString()}`);
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
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Track</button>
      </form>
      {error && <div className="popup error">{error}</div>}
    </div>
  );
};

export default Tracking;