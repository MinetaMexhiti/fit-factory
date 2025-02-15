import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const Checkout = () => {

  //Stores the list of items in the user's cart.
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0); //Stores the total price of the cart.
  const navigate = useNavigate();


  //Runs when the component mounts.
  useEffect(() => { 
    //Asynchronously fetches the cart items using axios with the token 
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
        calculateTotal(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err.message);
      }
    };

    const calculateTotal = (items) => {
      const totalPrice = items.reduce(
        (acc, item) =>
          acc + (parseFloat(item.product_price) || 0) * item.quantity,
        0
      );
      setTotal(totalPrice.toFixed(2));
    };

    fetchCartItems();
  }, []);

  const handleProceedToPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to proceed to payment.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/orders",
        {
          cartItems, 
          totalPrice: total,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert("Order created successfully. Redirecting to payment...");
        navigate("/payment", { state: { orderId: response.data.orderId } });
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (err) {
      console.error("Error proceeding to payment:", err.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <nav className="space-x-8 text-black">
            <Link to="/products/new-featured" className="hover:underline">
              New & Featured
            </Link>
            <Link to="/products/men" className="hover:underline">
              Men
            </Link>
            <Link to="/products/women" className="hover:underline">
              Women
            </Link>
            <Link to="/products/kids" className="hover:underline">
              Kids
            </Link>
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
          <Link to="/favorites">
            <button className="relative">
              <FaHeart className="text-gray-600 text-lg" />
            </button>
          </Link>
          <Link to="/cart">
            <button className="relative">
              <FaShoppingCart className="text-gray-600 text-lg" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Your Items</h2>
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.cart_id}
                    className="flex items-center justify-between border-b py-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.product_image || "/placeholder.jpg"}
                        alt={item.product_name || "Unknown Product"}
                        className="w-16 h-16 rounded-lg mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product_name || "Unknown Product"}
                        </h3>
                        <p className="text-gray-600">
                          Price: $
                          {parseFloat(item.product_price || 0).toFixed(2)}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-xl">
                      $
                      {(
                        (parseFloat(item.product_price) || 0) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary Section */}
            <div className="bg-gray-100 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <p className="text-lg">Subtotal</p>
                <p className="font-semibold text-lg">${total}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg">Shipping</p>
                <p className="font-semibold text-lg">Free</p>
              </div>
              <div className="flex justify-between mb-6">
                <p className="text-lg">Tax</p>
                <p className="font-semibold text-lg">$0.00</p>
              </div>
              <hr />
              <div className="flex justify-between mt-6">
                <p className="text-xl font-bold">Total</p>
                <p className="text-xl font-bold">${total}</p>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="bg-blue-500 text-white w-full mt-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
