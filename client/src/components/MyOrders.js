import React, { useState } from 'react';

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); //Stores the order that is selected by the user (used to display the detailed order information in a modal).

  //This is an array of order objects containing  , static butreal would come from the api 
  const orders = [
    { id: 1, date: '2024-01-12', total: '$120', status: 'Delivered' },
    { id: 2, date: '2024-01-15', total: '$85', status: 'Processing' },
    { id: 3, date: '2024-01-18', total: '$60', status: 'Cancelled' },
  ];
 

  //This function is triggered when the user clicks the "View" button for a specific order. 
  const handleViewOrder = (order) => {
    setSelectedOrder(order); 
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
        <div className="text-lg font-bold mb-8">User Menu</div>
        <nav className="flex flex-col space-y-4">
          <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
          <a href="/orders" className="hover:bg-gray-700 p-2 rounded">
            My Orders
          </a>
          <a href="/settings" className="hover:bg-gray-700 p-2 rounded">
            Account Settings
          </a>
          <a href="/logout" className="hover:bg-gray-700 p-2 rounded">
            Logout
          </a>
        </nav>
      </div>

      {/* Orders Section */}
      <div className="flex-grow p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {/* Orders List */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Order History</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Order ID</th>
                <th className="border-b py-2 px-4">Date</th>
                <th className="border-b py-2 px-4">Amount</th>
                <th className="border-b py-2 px-4">Status</th>
                <th className="border-b py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.total}</td>
                  <td
                    className={`py-2 px-4 ${
                      order.status === 'Delivered'
                        ? 'text-green-500'
                        : order.status === 'Processing'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-96">
              <h3 className="text-lg font-bold mb-4">Order Details</h3>
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Total:</strong> {selectedOrder.total}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <button
                onClick={closeOrderDetails}
                className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
