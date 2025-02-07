import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard data.');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {user ? (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email || 'No email provided'}</p>
          <p>
            <strong>Role:</strong>{' '}
            {user.role_id === 1 ? 'Admin' : 'Regular User'}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
