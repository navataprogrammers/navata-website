import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/Navbar.css';
import { MenuItems } from './MenuItems';
import DropdownContainer from './DropdownContainer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const [openDropdowns, setOpenDropdowns] = useState({
    company: false,
    media: false,
  });

  const toggleDropdown = useCallback((dropdownKey, openState) => {
    setOpenDropdowns(prev => {
      const newState = { company: false, media: false };
      if (openState) {
        newState[dropdownKey] = true;
      }
      return newState;
    });
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setOpenDropdowns({ company: false, media: false });
  }, []);

  const handleNavigation = (path) => {
    closeAllDropdowns();
    setIsMenuOpen(false);
    router.push(path);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      closeAllDropdowns();
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, closeAllDropdowns]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    handleResize();
    if (router.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    } else {
      setScrolled(false);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [router.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleItemClick = () => {
    closeAllDropdowns();
    setIsMenuOpen(false);
  };

  const isHomepage = router.pathname === '/';
  const headerClass = isHomepage
    ? `header homepage ${scrolled ? 'scrolled' : ''}`
    : 'header';

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <div className="left-section" style={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            priority
            width= {200}
            height= {150}
            className='logo-img'
          />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger" /><span className="hamburger" /><span className="hamburger" />
        </button>
        <nav className={`nav-container ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <DropdownContainer
                isOpen={openDropdowns.company}
                isMobile={isMobile}
                toggleDropdown={toggleDropdown}
                title="Company"
                menuItems={MenuItems.company}
                dropdownKey="company"
                onItemClick={handleItemClick}
              />
            </li>
            <li className="nav-item">
               <Link href="/franchise" className="nav-link">Franchise</Link>
            </li>
            <li className="nav-item">
              <Link href="/support" className="nav-link">Support</Link>
            </li>
            <li className="nav-item">
              <DropdownContainer
                isOpen={openDropdowns.media}
                isMobile={isMobile}
                toggleDropdown={toggleDropdown}
                title="Media"
                menuItems={MenuItems.media}
                dropdownKey="media"
                onItemClick={handleItemClick}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;