import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p className="mt-4">You do not have permission to access this page.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">Go Back to Home</Link>
    </div>
  );
};

export default NotAuthorized;
