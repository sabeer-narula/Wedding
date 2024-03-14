import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = auth.currentUser;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Wedding Planner
        </Link>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/vendors" className="hover:text-gray-300">
              Vendors
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className="hover:text-gray-300">
              Chatbot
            </Link>
          </li>
          <li>
            <Link to="/todo" className="hover:text-gray-300">
              To Do List
            </Link>
          </li>
          {user ? (
            <li className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleDropdown}
              >
                <img
                  src={user.photoURL || '/path/to/default/profile/image.jpg'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{user.displayName || user.email}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;