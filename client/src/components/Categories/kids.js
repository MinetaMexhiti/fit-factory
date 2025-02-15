import React from 'react';

// Example product data for Kids' section
const kidsProducts = [
  { id: 1, name: 'Puma Kids Shoes', price: 59.99, brand: 'Puma', image: '/path/to/image' },
  { id: 2, name: 'Reebok Kids Gloves', price: 19.99, brand: 'Reebok', image: '/path/to/image' },
  { id: 3, name: 'Nike Kids T-shirt', price: 25.99, brand: 'Nike', image: '/path/to/image' },
  { id: 4, name: 'Adidas Kids Jacket', price: 49.99, brand: 'Adidas', image: '/path/to/image' },
];

const Kids = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Kids' Fitness Apparel</h1>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {kidsProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            {/* Product Image */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = '/path/to/placeholder-image.png'} // Handle image load error
              />
            </div>
            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">Brand: {product.brand}</p>
              <p className="text-gray-600 font-bold">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;
