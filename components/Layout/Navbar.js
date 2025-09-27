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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    if (router.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    } else {
      setScrolled(false);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
            width={200}
            height={200}
            className='logo-img'
          />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger" /><span className="hamburger" /><span className="hamburger" />
        </button>
        <nav className={`nav-container ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/services" className="nav-link" onClick={handleItemClick}>Services</Link>
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
               <Link href="/franchise" className="nav-link" onClick={handleItemClick}>Franchise</Link>
            </li>
            <li className="nav-item">
              <Link href="/support" className="nav-link" onClick={handleItemClick}>Support</Link>
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