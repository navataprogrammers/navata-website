import React from 'react';
import { useRouter } from 'next/router'; 
import Navbar from './Navbar';
import Footer from './Footer'; 
import ClientBrands from './ClientBrands';

const Layout = ({ children }) => {
  const router = useRouter();
  // homepage ('/')
  const isHomepage = router.pathname === '/';

  // Conditionally className string
  const mainClassName = isHomepage 
    ? "main-content homepage-main" // class for the homepage
    : "main-content";             // Default class for all other pages

  return (
    <div className="app-container">
      <Navbar />
      {/*  Dynamically generated className */}
      <main className={mainClassName}>
        {children}
        <ClientBrands />
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;