import React, { useState, useEffect } from 'react';
import axios from 'axios';
const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      await axios.put('/users/me', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div>Loading account settings...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <div className="flex space-x-4 border-b pb-2 mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => handleTabChange('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'security' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => handleTabChange('security')}
        >
          Security
        </button>
      </div>

      {activeTab === 'profile' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                value={user?.username || ''}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              onClick={handleProfileUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Change Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border rounded-md"
              />
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
