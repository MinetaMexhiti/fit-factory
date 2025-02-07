import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';

import nikelogo from '../assets/images/nikelogo.png';
import adidaslogo from '../assets/images/adidaslogo.png';
import pumaLogo from '../assets/images/puma.png';
import ualogo from '../assets/images/ualogo.png';

import puma from '../assets/images/puma.png'; // adjust the path based on your project structure
import runn2 from '../assets/images/runn2.png';
import clothesfitnees from '../assets/images/clothesfitnees.png';
import outdoor from '../assets/images/outdoor.png';
import yoga from '../assets/images/yoga.png';


import GymEqu from '../assets/images/gymEqu.png';

const ExploreBrands = () => {
  const brands = [
    { name: 'Nike', description: 'Innovative sportswear and footwear.', logo: nikelogo },
    { name: 'Adidas', description: 'Performance-driven apparel and accessories.', logo: adidaslogo },
    { name: 'Under Armour', description: 'Cutting-edge activewear for all athletes.', logo: ualogo },
    { name: 'Puma', description: 'Fashionable and functional sports gear.', logo: puma },
  ];

  const collections = [
    { title: 'Best for Running', image: runn2 , description: 'High-performance gear for runners.' },
    { title: 'Gym Essentials', image: GymEqu, description: 'All the essentials for your workout.' },
    { title: 'Stylish Sportswear', image: clothesfitnees , description: 'Stay trendy while staying active.' },
    { title: 'Outdoor ', image: outdoor, description: 'Gear up for your outdoor explorations.' },
    { title: 'Yoga Collection', image: yoga, description: 'Comfortable and stylish yoga essentials.' },
  ];

  const testimonials = [
    {
      text: "Fit Factory offers top-notch brands! Their products are unmatched.",
      name: "John Doe",
      rating: 5,
    },
    {
      text: "A great variety of activewear. Highly recommended!",
      name: "Jane Smith",
      rating: 4,
    },
    {
      text: "I love shopping here. The collections are amazing!",
      name: "Alice Johnson",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-gradient-to-r from-white to-gray-100">
        <div className="absolute inset-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute top-0 left-0 w-full h-52 text-gray-300"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M0,32L48,48C96,64,192,96,288,117.3C384,139,480,149,576,133.3C672,117,768,75,864,74.7C960,75,1056,117,1152,128C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-white to-gray-100 opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-gray-800">
          <h1 className="text-5xl font-bold mb-4">Explore Our Top Brands</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the best sportswear and activewear from the top brands in the world.
          </p>
        </div>
      </div>

      {/* Brands Section */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Top Brands We Love</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-4">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
              <p className="text-gray-600 text-center mb-4">{brand.description}</p>
              <Link to={`/brands/${brand.name.toLowerCase()}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Learn More <FaArrowRight className="inline-block ml-2" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {collections.map((collection, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                <p className="text-gray-600">{collection.description}</p>
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
  <Link to="/coming-soon">View Collection</Link>
</button>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg italic">"{testimonial.text}"</p>
                <div className="flex justify-center mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <h3 className="mt-4 font-bold text-lg">- {testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-500 text-white py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Unlock Exclusive Deals Today!</h2>
          <p className="text-lg mb-6">Sign up now to receive the latest updates and deals from Fit Factory!</p>
          <button className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-900 transition">
            Join Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExploreBrands;
