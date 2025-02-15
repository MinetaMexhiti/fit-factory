import React, { useEffect, useState } from 'react';
//use effect : fetching data , subscription , eventlisteners
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); //State to store the product data that will be fetched from the backend.
  const [loading, setLoading] = useState(true);//if data is being still loading
  const [error, setError] = useState(null);


  //Runs when the component first mounts or when the id from the URL changes 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();

        //succesfull 
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); //finally block, ensuring that the loading state is updated once the fetch operation is complete
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add items to the cart.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
      alert('Failed to add product to cart.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image || 'https://via.placeholder.com/300'}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-700 text-lg mb-2">{product.description}</p>
      <p className="text-xl font-semibold">
        Price: ${product.price.toFixed(2)}
      </p>
      <button
        onClick={addToCart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        disabled={!product.inStock}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default ProductDetails;
