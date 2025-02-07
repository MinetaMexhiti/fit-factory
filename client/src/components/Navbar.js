import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about" className="mr-4">About</Link>
        <Link to="/products" className="mr-4">Products</Link>
        <Link to="/brandPage" className="mr-4">BrandPage</Link>
      </div>
      <div>
        {token ? (
          <>
            <span className="mr-4">Welcome, User!</span>
            <Link to="/dashboard" className="mr-4 text-blue-500 hover:underline">Dashboard</Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
