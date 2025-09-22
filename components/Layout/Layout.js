import React from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Navbar from './Navbar';
import Footer from './Footer'; 
import ClientBrands from '../ClientBrands';

const Layout = ({ children }) => {
  const router = useRouter();
  // Check if the current path is the homepage ('/')
  const isHomepage = router.pathname === '/';

  // Conditionally create the className string
  const mainClassName = isHomepage 
    ? "main-content homepage-main" // Add a special class for the homepage
    : "main-content";             // Use the default class for all other pages

  return (
    <div className="app-container">
      <Navbar />
      {/* Use the dynamically generated className */}
      <main className={mainClassName}>
        {children}
        <ClientBrands />
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;