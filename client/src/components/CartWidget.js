import React from 'react';

const CartWidget = ({ cartItems }) => {
    return (
        <div className="fixed top-4 right-4">
            <button className="relative p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
                🛒 Cart
                <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                >
                    {cartItems.length}
                </span>
            </button>
        </div>
    );
};

export default CartWidget;
