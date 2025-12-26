import React from 'react';
import '../../styles/Dropdown.css';
import Link from 'next/link';

const Dropdown = ({ menuItems, onItemClick }) => {
  return (
    <ul className="dropdown-menu">
      {menuItems.map((item, index) => {
        if (item.path === '/blog') {
          return (
            <li key={index}>
              <a
                href={item.path}
                className={item.cName}
                onClick={onItemClick}
              >
                {item.title}
              </a>
            </li>
          );
        }
        return (
          <li key={index}>
            <Link
              href={item.path}
              className={item.cName}
              onClick={onItemClick}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Dropdown;
