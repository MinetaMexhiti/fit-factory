import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import AboutUs from './src/pages/AboutUs';
import ProductDetails from './src/pages/ProductDetails';
import Auth from '../src/components/Auth';
import ProtectedRoute from './src/components/ProtectedRoute';
import Dashboard from './src/components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} /> {/* Add AboutUs component */}
        <Route path="/product/:id" element={<ProductDetails />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />
        
        {/* Protected route for dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
