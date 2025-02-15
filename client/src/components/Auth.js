import React, { useState } from 'react';
import axios from 'axios';
const Auth = ({ type }) => {
  const [username, setUsername] = useState(''); //: Holds the value of the username entered by the use
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); 
  const [error, setError] = useState('');

  const handleSubmit = async (e) => { //when the user clicks the login or register button.
    e.preventDefault(); //prevents the default form submission, which would reload the page.
 
    //If the type is 'login', it uses the login API endpoint pr another  
    const data = { username, password };
    const url = type === 'login' 
  ? 'http://localhost:3000/api/users/login' 
  : 'http://localhost:3000/api/users/register';


    if (type === 'register' && password !== passwordConfirmation) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(url, data);
      if (type === 'login') {
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        window.location.href = '/dashboard'; // Redirect to dashboard
      } else {
        alert('Registration successful! Please log in.');
        window.location.href = '/login'; // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {type === 'login' ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
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
          {type === 'register' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {type === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
