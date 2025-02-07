import React, { useState, useEffect } from 'react';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import adidas from '../assets/images/adidas10cloth.png';
import underarmour from '../assets/images/underarmour1.png';
import puma from '../assets/images/puma1.png';
import nike from '../assets/images/nike10clothes.png';


import nike1 from '../assets/images/nike1.png';
import nike2 from '../assets/images/nike2.png';
import nike3 from '../assets/images/nike3.png';
import nike4 from '../assets/images/nike4.png';
import nike5 from '../assets/images/nike5.png';
import nike19cl from '../assets/images/nik19clothes.png';
import nike7Clothes from '../assets/images/nike7Clothes.png';
import nike8clothes from '../assets/images/nike8clothes.png';
import nike9clothes from '../assets/images/nike9clothes.png';
import nike10clothes from '../assets/images/nike10clothes.png';
import nike11 from '../assets/images/nike11.png';
import nike12 from '../assets/images/nike12clothes.png';
import nike13trenerke from '../assets/images/nike13trenerke.png';
import nike14legi from '../assets/images/nike14legi.png';
import nike15shirt from '../assets/images/nike15shirt.png';
import nike16clothes from '../assets/images/nike16clothes.png';
import nike17shirt from '../assets/images/nike17tshirt.png';
import nike18 from '../assets/images/nike18.png';
import nike20 from '../assets/images/nike20.png';


import adidas1 from '../assets/images/adidas1.png';
import adidas2 from '../assets/images/adidas2.png';
import adidas4 from '../assets/images/adidas4.png';
import adidas5 from '../assets/images/adidas5.png';
import adidas6 from '../assets/images/adidas6.png';
import adidas7 from '../assets/images/adidas7.png';
import adidas20 from '../assets/images/adidas8.png';
import adidas9 from '../assets/images/adidas9cloth.png';
import adidas10 from '../assets/images/adidas10cloth.png';
import adidas11 from '../assets/images/adidas11cloth.png';
import adidas12 from '../assets/images/adidas12cloth.png';
import adidas14 from '../assets/images/adidas14cloth.png';
import adidas15 from '../assets/images/adidas15cloth.png';
import adidas16 from '../assets/images/adidas16cloth.png';
import adidas17 from '../assets/images/adidas17cloth.png';
import adidas19 from '../assets/images/adidas189cloth.png';
import adidas18 from '../assets/images/adidas18cloth.png';







import puma1 from '../assets/images/puma1.png';
import puma2 from '../assets/images/puma2.png';
import puma3 from '../assets/images/puma3.png';
import puma4 from '../assets/images/puma4.png';
import puma5 from '../assets/images/puma5.png';

import underarmour1 from '../assets/images/underarmour1.png';
import underarmour2 from '../assets/images/underarmour2.png';
import underarmour3 from '../assets/images/underarmour3.png';

import ProductList from './ProductList';




const allProducts = [

  { id: 21, name: 'Shoes ', price: 160.99, brand: 'Nike', image: nike1 },

  { id: 23, name: 'Nike Shoes', price: 170.99, brand: 'Nike', image: nike2},
  { id: 24, name: 'Nike Shoes', price: 140.99, brand: 'Nike', image: nike3 },
  { id: 25, name: 'Nike Shoes', price: 110.99, brand: 'Nike', image: nike4 },
  { id: 26, name: 'Nike Shoes', price: 110.99, brand: 'Nike', image: nike5 },
  { id: 27, name: 'Nike ', price: 78.99, brand: 'Nike', image: nike16clothes },
{ id: 28, name: 'Nike ', price: 67.99, brand: 'Nike', image: nike7Clothes },
  { id: 31, name: 'Nike ', price: 89.99, brand: 'Nike', image: nike8clothes },
  { id: 32, name: 'Nike', price: 64.99, brand: 'Nike', image: nike9clothes},
  { id: 33, name: 'Nike ', price: 99.99, brand: 'Nike', image: nike10clothes },
  { id: 34, name: 'Nike Shoes', price: 110.99, brand: 'Nike', image: nike11 },
  { id: 30, name: 'Nike Shoes Rt', price: 154.99, brand: 'Nike', image: nike12 },
  { id: 40, name: 'Nike ', price: 78.99, brand: 'Nike', image: nike13trenerke },
  { id: 41, name: 'Nike Leggings', price: 56.99, brand: 'Nike', image: nike14legi},
  { id: 42, name: 'Nike Shirt', price: 45.99, brand: 'Nike', image: nike15shirt },
  { id: 43, name: 'Nike', price: 65.99, brand: 'Nike', image: nike16clothes },
  { id: 44, name: 'Nike Shirt', price: 34.99, brand: 'Nike', image: nike17shirt },
  { id: 45, name: 'Nike Shoes', price: 110.99, brand: 'Nike', image: nike18 },
  { id: 46, name: 'Nike Shoes', price: 150.99, brand: 'Nike', image: nike20 },



  { id: 2, name: 'Adidas Performance Pants', price: 59.99, brand: 'Adidas', image: adidas },
  { id: 3, name: 'Under Armour Compression Shirt', price: 45.99, brand: 'Under Armour', image: underarmour1 },
  { id: 4, name: 'Puma Sports Jacket Men', price: 79.99, brand: 'Puma', image: puma1 },
  { id: 6, name: 'Nike Running Shoes Max', price: 89.99, brand: 'Nike', image: nike10clothes },
  { id: 8, name: 'Under Armour Gym Bag', price: 55.99, brand: 'Under Armour', image: underarmour2 },
  { id: 13, name: 'Under Armour Leggings', price: 49.99, brand: 'Under Armour', image: underarmour3 },
  { id: 14, name: 'Puma Running Shoes', price: 99.99, brand: 'Puma', image: puma3 },
  { id: 17, name: 'Adidas Running Shorts', price: 44.99, brand: 'Adidas', image: adidas14 },

  

  




];

const Products = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState('All');
  const [filteredPriceRange, setFilteredPriceRange] = useState('All');
  const [filteredSize, setFilteredSize] = useState('All');
  const [alertMessage, setAlertMessage] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:3000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartCount(response.data.length); 
      } catch (err) {
        console.error('Error fetching cart count:', err.response?.data || err.message);
      }
    };

    fetchCartCount();
  }, []);

  const addToCart = async (product) => {
    console.log('Adding to cart:', { productId: product.id, quantity: 1 });  // Check if the product ID is correct
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add items to the cart.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:3000/api/cart',
        { productId: product.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log('Product added to cart:', response.data);
      setAlertMessage('Product added to cart successfully!');
      setCart((prevCart) => [...prevCart, product]);
  
      setTimeout(() => {
        setAlertMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error adding product to cart:', error.response?.data || error.message);
      setAlertMessage('Failed to add product to cart.');
      setTimeout(() => {
        setAlertMessage('');
      }, 2000);
    }
  };
  

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesBrand =
      filteredBrand === 'All' || product.brand === filteredBrand;
    const matchesPrice =
      filteredPriceRange === 'All' ||
      (filteredPriceRange === '$0-$50' && product.price <= 50) ||
      (filteredPriceRange === '$50-$100' && product.price > 50 && product.price <= 100) ||
      (filteredPriceRange === '$100+' && product.price > 100);
    const matchesSize =
      filteredSize === 'All' || product.size === filteredSize;
  
    return matchesBrand && matchesPrice && matchesSize;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center w-full">
        <div className="flex items-center">
        <nav className="space-x-8 text-black">
        <Link to="/products/new-featured" className="hover:underline">New & Featured</Link>
        <Link to="/products/men" className="hover:underline">Men</Link>
          <Link to="/products/women" className="hover:underline">Women</Link>
          <Link to="/products/kids" className="hover:underline">Kids</Link>
         

 
</nav>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none"
            />
          </div>
          <button className="relative">
            <FaHeart className="text-gray-600 text-lg" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {favorites.length}
              </span>
            )}
          </button>
          <Link to="/cart">
            <button className="relative">
              <FaShoppingCart className="text-gray-600 text-lg" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </button>
          </Link>
          {alertMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-md">
              {alertMessage}
            </div>
          )}
        </div>
      </header>

     {/* Hero Section */}
     <div className="relative w-full h-80 bg-white flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-1 bg-purple-400 opacity-20 transform rotate-6"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-1 bg-blue-400 opacity-20 transform -rotate-6"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-1 bg-yellow-400 opacity-20 transform -rotate-4"></div>

        </div>
        <h1 className="text-4xl font-extrabold text-black text-center">
          Discover Premium Fitness Apparel
        </h1>
      </div>

      {/* Main Section with Filters and Products */}
      <div className="flex gap-6 max-w-7xl mx-auto p-8">
        {/* Filters Section */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Filter by</h2>
          {/* Brand Filter */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Brand</label>
            <select
              value={filteredBrand}
              onChange={(e) => setFilteredBrand(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Under Armour">Under Armour</option>
              <option value="Puma">Puma</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Price Range</label>
            <select
              value={filteredPriceRange}
              onChange={(e) => setFilteredPriceRange(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Prices</option>
              <option value="$0-$50">$0 - $50</option>
              <option value="$50-$100">$50 - $100</option>
              <option value="$100+">$100+</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Size</label>
            <select
              value={filteredSize}
              onChange={(e) => setFilteredSize(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                  
                </button>
                
                <button
                  className={`text-xl ${
                    favorites.includes(product.id) ? 'text-red-500' : 'text-gray-500'
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <FaHeart />
                </button>
                
              </div>
              
            </div>
            
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Products;
