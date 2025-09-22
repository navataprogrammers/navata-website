import React from 'react';
import '../../styles/Dropdown.css';
import Link from 'next/link';

function Dropdown({ menuItems, onClose, onItemClick }) {
  return (
    <ul className="dropdown-menu">
      {menuItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.path}
            className={item.cName}
            onClick={onItemClick}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;