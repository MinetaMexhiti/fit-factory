import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'; // Ensure that App.css is in the same directory as App.js

import NotAuthorized from './components/NotAuthorized';
import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ExploreBrands from './pages/ExploreBrands';
import ComingSoon from './pages/ComingSoon';
import MyOrders from './components/MyOrders';
import BrandDetails from './pages/BrandDetails';
import UserProfile from './pages/UserProfile';
import AccountSettings from './components/AccountSettings';
import Cart from './components/Cart/Cart';
import Men from './components/Categories/men';
import Women from './components/Categories/Women';
import Kids from './components/Categories/kids';
import Featured from './components/Categories/Featured';
import CartItem from './components/Cart/Cartitem';
import OurStory from './pages/OurStory';
import Checkout from './pages/Checkout';

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/explore-brands" element={<ExploreBrands />} />
          <Route path="/brands/:brandName" element={<BrandDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/cartitems" element={<CartItem />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/new-featured" element={<Featured />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* User Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute roleRequired="user">
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute roleRequired="user">
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute roleRequired="user">
                <AccountSettings />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roleRequired="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-6">
          <p>© 2024 Fit Factory. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
