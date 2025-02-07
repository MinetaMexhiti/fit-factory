import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaShoppingCart, FaHeart, FaClipboardList, FaCog } from 'react-icons/fa';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing in localStorage.');
          setError('You are not logged in.');
          return;
        }
  
        console.log('Token used:', token);
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response from /me:', response.data);
        
  
        console.log('User profile response:', response.data);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Failed to fetch user profile.');
      }
    };
  
    fetchUserProfile();
  }, []);
  

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personalInfo':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <p className="mb-2"><strong>Name:</strong> {user.username}</p>
            <p className="mb-4"><strong>Email:</strong> {user.email || 'No email provided'}</p>
            <p className="text-gray-600 italic">
              "Keep your profile up-to-date to stay connected with us!"
            </p>
          </div>
        );
      case 'orders':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
            <p className="text-gray-700 italic">
              You currently have no orders. Start shopping today!
            </p>
          </div>
        );
      case 'wishlist':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Wishlist</h3>
            <p className="text-gray-700 italic">
              Your wishlist is empty. Explore and add items you love!
            </p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
              Update Information
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 -z-10"></div>
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full opacity-20 blur-3xl -z-10"></div>

      <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome, {user.username}!</h1>

      {/* Tabs Navigation */}
      <div className="flex justify-around mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab('personalInfo')}
          className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'personalInfo' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
        >
          <FaClipboardList />
          <span>Personal Info</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'orders' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
        >
          <FaShoppingCart />
          <span>Orders</span>
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'wishlist' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
        >
          <FaHeart />
          <span>Wishlist</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'settings' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
        >
          <FaCog />
          <span>Settings</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-8">{renderTabContent()}</div>

      {/* Activity Overview */}
      {chartData && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </div>
      )}

      {/* Progress Tracker */}
      <div className="bg-blue-100 p-4 mt-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Progress Tracker</h2>
        <p className="text-gray-700">You’re 50% complete in setting up your profile. Complete your profile to unlock exclusive features!</p>
        <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
          <div className="bg-blue-500 h-4 rounded-full w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
