import React, { useState, useCallback } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Truck, Search, CreditCard, MapPin } from "lucide-react";
import "../styles/HomePage.css";
import FreightForm from "../components/Home/Freightform";
import TrackForm from "../components/Home/Tracking";
import CompanyValues from "../components/Home/CompanyValues";


const HomePage = () => {
  // This state now controls the visibility of the Track and Pay tabs
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();

  // Opens payment links in a new tab
  const handleRedirect = useCallback((type) => {
    let url = '';
    if (type === 'single') {
      url = 'https://online.navata.com/wbillpayments/Epaymenticici.htm';
    } else {
      url = 'https://online.navata.com/wbillpayments/Epaymenticicimany.htm';
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Navigates to the branch locator page
  const handleBranchRedirect = useCallback(() => {
    router.push('/branch');
  }, [router]);

  // Toggles the active tab for 'Track' and 'Pay'
  const handleTabClick = useCallback((tabName) => {
    setActiveTab(prevActiveTab => (prevActiveTab === tabName ? null : tabName));
  }, []);
     
  return (
    <div className="homepage">
      <div 
        className={`hero-wrapper ${activeTab === 'track' ? 'form-active' : ''}`}
      >
        <Image
          src="/images/Home_page.webp"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="home-bg-img"
          priority
        />

        <div className="hero-overlay" />
        <div className="hero-content">
           <h1>Empower your business to reach every corner with reliable and caring logistics</h1>
           <div className="hero-buttons icon-buttons-grid">
            
            {/*--- Freight Button ---*/}
            <div className="icon-button" onClick={() => router.push('/freight-cal')}>
              <Truck className="icon-button__icon" />
              <span className="icon-button__text">Freight</span>
            </div>
            
            {/*--- Track Button ---*/}
            <div id = "track-button" className="icon-button" onClick={() => handleTabClick('track')}>
              <Search className="icon-button__icon" />
              <span className="icon-button__text">Track</span>
            </div>

            {/*--- Pay Button with Dropdown ---*/}
            <div className="icon-button-wrapper" style={{ position: 'relative' }}>
              <div className="icon-button" onClick={() => handleTabClick('pay')}>
                <CreditCard className="icon-button__icon" />
                <span className="icon-button__text">Pay</span>
              </div>
              {activeTab === 'pay' && (
                <div className="payment-options">
                  <button onClick={() => handleRedirect('single')}>Single Waybill</button>
                  <button onClick={() => handleRedirect('multiple')}>Multiple Waybills</button>
                </div>
              )}
            </div>

            {/*--- Locate Button ---*/}
            <div className="icon-button" onClick={handleBranchRedirect}>
              <MapPin className="icon-button__icon" />
              <span className="icon-button__text">Locate</span>
            </div>

          </div>
        </div>
        
        {/* Conditionally rendered form for tracking */}
        {activeTab === 'track' && <TrackForm />}

      </div>
      
      {/* Company Values section below the fold */}
      <CompanyValues />
    </div>
  );
};

export default HomePage;