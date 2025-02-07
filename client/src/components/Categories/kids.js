import React from 'react';

const kidsProducts = [
  { id: 1, name: 'Puma Kids Shoes', price: 59.99, brand: 'Puma', image: '/path/to/image' },
  { id: 2, name: 'Reebok Kids Gloves', price: 19.99, brand: 'Reebok', image: '/path/to/image' },
];

const Kids = () => {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Kids' Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {kidsProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;
