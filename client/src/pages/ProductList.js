import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ products }) => {

  // /Holds the current search query entered by the user in the search input field.
  const [searchQuery, setSearchQuery] = useState(''); //Updates the searchQuery state whenever the user types something in the input field.

  const [filteredProducts, setFilteredProducts] = useState(products); //update when filters are changed


  // This function is called every time the user types something in the search input field (due to the onChange event handler).
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    console.log('Search query entered:', query); // Ensure it's logged when you type
    setSearchQuery(query);
  
    if (query.length > 0) {
      try {
        const response = await axios.get('http://localhost:3000/api/v2/products/search?query=' + query);
        console.log('Search Results:', response.data);
        setFilteredProducts(response.data);  // Display filtered results
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setFilteredProducts(products);  // Show all products when search query is empty
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
