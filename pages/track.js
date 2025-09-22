import React, { Suspense } from 'react';
import TrackPage from '../components/Home/TrackPage';
import "../styles/Tracking.css"; 

const TrackingPage = () => {
  return (
    <div className="page-wrapper">
      <Suspense fallback={<div>Loading Tracker...</div>}>
        <TrackPage />
      </Suspense>
    </div>
  );
};

export default TrackingPage;