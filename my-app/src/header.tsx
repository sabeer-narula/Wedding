import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Wedding Planner</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/vendors" className="hover:text-gray-300">Vendors</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;