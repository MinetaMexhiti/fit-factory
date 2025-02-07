import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    console.log(`Search query entered: ${query}`); 
    setSearchQuery(query);
  
    if (query.length > 0) {
      try {
        console.log(`Making request to: /api/products/search?query=${query}`);
        
        const response = await axios.get('http://localhost:3000/api/products/search?query=' + query);
        console.log('Search Results:', response.data); 
        
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setFilteredProducts(products); 
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            description={product.description || ''}
            price={`$${product.price.toFixed(2)}`}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ title, description, price, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl">
      <Link to={`/product/${title}`}>
        <img src={image} alt={title} className="w-full h-40 object-cover mb-4" />
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{description}</p>
        <p className="text-lg font-bold">{price}</p>
      </Link>
    </div>
  );
};

export default ProductList;
