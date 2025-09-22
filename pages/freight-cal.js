import React from 'react';
import FreightCalculatorPage from '../components/Home/freightCal';
import { Suspense } from 'react';
import "../styles/Freight.css";

const FreightPage = () => {
  return (
    // This new wrapper will center the content on the page
    <div className="page-wrapper">
          <h1>Freight Calculator</h1>

      <Suspense fallback={<div>Loading Calculator...</div>}>
        <FreightCalculatorPage />
      </Suspense>
    </div>
  );
};


export default FreightPage;

 


