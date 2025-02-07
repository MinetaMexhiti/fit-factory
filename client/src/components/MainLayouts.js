// MainLayout.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './assets/images/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function MainLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Logo and Navigation */}
      <header className="text-center mt-6 mb-4">
        <img src={Logo} alt="Logo" className="mx-auto mb-2 w-24" />
        <nav className="flex justify-center space-x-4 text-lg text-gray-700">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/categories" className="hover:text-blue-500">Categories</Link>
          <Link to="/about" className="hover:text-blue-500">About Us</Link>
          <Link to="/brand/nike" className="hover:text-blue-500">Nike</Link>
          <Link to="/brand/adidas" className="hover:text-blue-500">Adidas</Link>
        </nav>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <div className="space-y-4">
          <p className="text-lg">© 2024 Fit Factory. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
