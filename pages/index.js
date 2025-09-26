import React, { useState, useCallback } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Truck, Search, CreditCard, MapPin } from "lucide-react";
import "../styles/HomePage.css";
import FreightForm from "../components/Home/Freightform";
import TrackForm from "../components/Home/Tracking";
import CompanyValues from "../components/Home/CompanyValues";
import LatestUpdate from "../components/Home/latestUpdates";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // tracks hovered/active button
  const router = useRouter();

  const handleRedirect = useCallback((type) => {
    const url = type === 'single'
      ? 'https://online.navata.com/wbillpayments/Epaymenticici.htm'
      : 'https://online.navata.com/wbillpayments/Epaymenticicimany.htm';
    window.open(url, '_blank', 'noopener,noreferrer');
     setActiveTab(null);
     setActiveButton(null);
  }, []);

  const handleBranchRedirect = useCallback(() => {
    router.push('/branch');
  }, [router]);

  const handleTabClick = useCallback((tabName) => {
    setActiveTab(prev => (prev === tabName ? null : tabName));
  }, []);

  return (
    <div className="homepage">
      <div className={`hero-wrapper ${activeTab === 'track' ? 'form-active' : ''}`}>
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
            <div
              className={`icon-button ${activeButton === 'freight' ? 'active' : ''}`}
              onClick={() => router.push('/freight-cal')}
              onMouseEnter={() => setActiveButton('freight')}
              onMouseLeave={() => setActiveButton(null)}
            >
              <Truck className="icon-button__icon" />
              <span className="icon-button__text">Freight</span>
            </div>

            {/*--- Track Button ---*/}
            <div
              id="track-button"
              className={`icon-button ${
                activeButton === 'track'
                  ? 'active'
                  : (activeButton && activeButton !== 'track') || activeTab === 'pay'
                  ? 'inactive'
                  : ''
              }`}
              onClick={() => handleTabClick('track')}
              onMouseEnter={() => setActiveButton('track')}
              onMouseLeave={() => setActiveButton(null)}
            >
              <Search className="icon-button__icon" />
              <span className="icon-button__text">Track</span>
            </div>

            {/*--- Pay Button ---*/}
            <div className="icon-button-wrapper">
              <div
                className={`icon-button ${activeButton === 'pay' ? 'active' : ''}`}
                onClick={() => handleTabClick('pay')}
                onMouseEnter={() => setActiveButton('pay')}
                onMouseLeave={() => setActiveButton(null)}
              >
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
            <div
              className={`icon-button ${activeButton === 'locate' ? 'active' : ''}`}
              onClick={handleBranchRedirect}
              onMouseEnter={() => setActiveButton('locate')}
              onMouseLeave={() => setActiveButton(null)}
            >
              <MapPin className="icon-button__icon" />
              <span className="icon-button__text">Locate</span>
            </div>

          </div>
        </div>

        {/* Conditionally rendered Track form */}
        {activeTab === 'track' && <TrackForm />}
      </div>

      {/* Company Values section */}
      <CompanyValues />
      <LatestUpdate />
    </div>
  );
};

export default HomePage;
