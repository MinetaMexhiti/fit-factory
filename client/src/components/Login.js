import React, { useState } from 'react';
import axios from './axios'; // Your configured Axios instance

const Login = () => {
  const [username, setUsername] = useState(''); // Updates the username state whenever the user types in the username field 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); //Used to update the error state with an error message
  const [loading, setLoading] = useState(false);


  //This is an asynchronous function that handles the form submission when the user clicks the login button
  const handleLogin = async (e) => {
    e.preventDefault(); //Prevents the default form submission behavior  , reloading the page  
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token); // Store token
      alert('Login successful!');
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
