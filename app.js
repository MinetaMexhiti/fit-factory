import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Auth from './components/Auth'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import Dashboard from './components/Dashboard'; 


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" render={() => <Auth type="login" />} />
        <Route path="/register" render={() => <Auth type="register" />} />
        {/* Protected route */}
        <ProtectedRoute path="/dashboard" component={Dashboard} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
