import React, { Suspense } from 'react';
import TrackPage from '../components/Home/TrackPage';
import "../styles/Tracking.css"; 

const TrackingPage = () => {
  return (
    <div className="page-wrapper">
      <h1>Track Your Shipment</h1>
       <img 
        src="/route_1917451.png" 
        alt="Package route icon" 
        width="50" 
        height="50" 
        class='track-icon'
      />
      <Suspense fallback={<div>Loading Tracker...</div>}>
        <TrackPage />
      </Suspense>
    </div>
  );
};

export default TrackingPage;