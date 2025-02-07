import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import nike1 from '../assets/images/nike1.png';
import nike2 from '../assets/images/nike2.png';
import nike3 from '../assets/images/nike3.png';
import nike4 from '../assets/images/nike4.png';


import HroImg from '../assets/images/HroImg.png';
import Nike from '../assets/images/nike5.png';
import adidas1 from '../assets/images/adidas1.png';


const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ username: 'User' }); 
    }
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/'); 
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img src={HroImg} alt="Hero" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Fit Factory</h1>
        </div>
      </div>

      {/* Main Navigation with Account and Language */}
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        {/* Language Selector */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded-md bg-white"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="hr">Croatian</option>
          <option value="sq">Albanian</option>
          <option value="mk">Macedonian</option>
        </select>

        {/* Account Section */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600"
            >
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)} // Close dropdown on click
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <Link to="/login">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors mr-4">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors">
                Register
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Submenu Section */}
      <div className="bg-white py-4 shadow-md">
        <div className="flex justify-center space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/explore-brands" className="hover:text-blue-500">
            Explore Brands
          </Link>
          <Link to="/products" className="hover:text-blue-500">
            Products
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
        </div>
      </div>

      {/* Section 1: Why Choose Fit Factory? */}
      <section className="text-center py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Fit Factory?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          At Fit Factory, we bring you the finest selection of high-performance
          activewear, designed to keep you comfortable and stylish during every
          workout. Whether you're hitting the gym, going for a run, or just
          relaxing, our products offer unmatched quality and durability.
        </p>
      </section>

      {/* Promotion Banner */}
      <div className="bg-red-300 text-white text-center py-4">
        <h2 className="text-xl font-bold">
          Special Promotion: 20% Off on Products Only Today!
        </h2>
        <p className="mt-2">Don't miss out on our exclusive deal. Shop now and save!</p>
      </div>

      {/* Section 2: Our Top Picks for You */}
      <section className="text-center py-12 bg-gray-100">
  <h2 className="text-3xl font-semibold mb-4">Our Top Picks for You</h2>
  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
    Explore our curated selection of activewear that combines fashion and function. Whether you're breaking a sweat at the gym, running errands, or lounging at home, our top picks are designed to fit seamlessly into your lifestyle. 
    Each product is handpicked to ensure exceptional quality, comfort, and style that you can count on. With a focus on innovative fabrics, trendy designs, and practical features, we’ve got everything you need to look and feel your best.
    From performance gear that enhances your workout to everyday essentials that keep you moving, these selections are guaranteed to inspire your active journey.
  </p>
</section>

      {/* Product Slider */}
      <Slider {...sliderSettings} className="p-6">
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <img src={nike1} alt="Nike Dry-Fit Shirt" className="w-full h-80 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">Nike DShoes</h2>
          <p className="text-lg font-bold">$149.99</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <img src={nike3} alt="Adidas Performance Pants" className="w-full h-80 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">Shoes Pro</h2>
          <p className="text-lg font-bold">$159.99</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <img src={nike2} alt="Puma Sports Jacket" className="w-full h-80 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">Shoes Pro Ti</h2>
          <p className="text-lg font-bold">$179.99</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <img src={nike3} alt="Under Armour Shirt" className="w-full h-80 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">Shoes Ad Re</h2>
          <p className="text-lg font-bold">$145.99</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <img src={nike4} alt="Reebok Training Shorts" className="w-full h-80 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">Shoes Nike re</h2>
          <p className="text-lg font-bold">$139.99</p>
        </div>
      </Slider>
    </div>
  );
};

export default Home;
