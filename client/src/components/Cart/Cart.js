import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched cart items:", response.data);
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err.response?.data || err.message);
        if (err.response?.status === 403) {
          setError("Access denied. Invalid or expired token.");
        } else {
          setError("Failed to fetch cart items.");
        }
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');  //JWT token from localStorage
  
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
  
    // Ensure quantity is a valid positive number
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    try {
      
      const response = await axios.post("http://localhost:3000/api/cart", {
        productId,  
        quantity    
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,  
        },
      });
  
      console.log("Item added to cart:", response.data);
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding product to cart:", err.response?.data || err.message);
      alert("Failed to add item to cart.");
    }
  };
  

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1. Remove the item if needed.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to update item quantities.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/cart/${cartItemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.cart_id === cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating item quantity:", err.response?.data || err.message);
      alert("Failed to update item quantity.");
    }
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) =>
        total + (parseFloat(item.product_price) || 0) * item.quantity,
      0
    );

  const removeFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to remove items from the cart.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/api/cart/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Item removed from cart successfully!");
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cart_id !== cartItemId)
        );
      }
    } catch (err) {
      console.error("Error removing item from cart:", err.response?.data || err.message);
      alert("Failed to remove item from cart.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.cart_id} className="flex items-center justify-between border-b py-4">
              <img
                src={item.product_image || "/placeholder.jpg"}
                alt={item.product_name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.product_name}</h3>
                <p>Price: ${parseFloat(item.product_price || 0).toFixed(2)}</p>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-l-md"
                    onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-r-md"
                    onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => removeFromCart(item.cart_id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-between mt-6">
            <h2 className="text-2xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </h2>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
