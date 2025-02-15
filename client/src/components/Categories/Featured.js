import React, { useState } from "react";

// For now, I'll keep the placeholder content
const Featured = () => {
  const [activeTab, setActiveTab] = useState("new");

  const products = [
    { id: 1, title: "Premium Training Set", price: 129.99 },
    { id: 2, title: "Fitness Essentials Pack", price: 89.99 },
    { id: 3, title: "High-Performance Shoes", price: 159.99 },
    { id: 4, title: "Compression Wear Set", price: 79.99 },
    { id: 5, title: "Lightweight Running Jacket", price: 69.99 },
    { id: 6, title: "Advanced Fitness Tracker", price: 199.99 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">New & Featured</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "new" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("new")}
        >
          New Arrivals
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "featured" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("featured")}
        >
          Featured
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Image placeholder */}
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Product Image</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-300">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Featured;
