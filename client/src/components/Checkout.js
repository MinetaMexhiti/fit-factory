import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!shippingAddress) {
            setError('Shipping address is required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to place an order.');
                return;
            }

            const response = await axios.post(
                'http://localhost:3000/api/orders',
                {
                    userId: 1, // Replace with actual user ID
                    products: cartItems.map((item) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                    })),
                    shippingAddress,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            console.error('Error placing order:', err.response?.data || err.message);
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Shipping Address</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
                Place Order
            </button>
        </div>
    );
};

export default Checkout;
