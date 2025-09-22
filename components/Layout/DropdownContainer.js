import React from 'react';
import Dropdown from './Dropdown';

const DropdownContainer = ({ isOpen,isMobile,toggleDropdown,onClose,title,menuItems,
      onItemClick ,dropdownKey }) => {
        
  const handleMouseEnter = () => {
    if (!isMobile) {
      toggleDropdown(dropdownKey, true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      toggleDropdown(dropdownKey, false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      toggleDropdown(dropdownKey, !isOpen);
    }
  };

  return (
    <div
      className="nav-link"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
  <div onClick={handleClick}>
    {title} <i className="fas fa-caret-down" />
  </div>
  {isOpen && (
    <Dropdown
      menuItems={menuItems}
      onClose={onClose}
      onItemClick={onItemClick}
    />
  )}
</div>

  );
};

export default DropdownContainer;
