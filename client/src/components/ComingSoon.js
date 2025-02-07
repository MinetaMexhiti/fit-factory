import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">Coming Soon!</h1>
      <p className="text-xl mb-6 text-center">
        We're working hard to bring this collection to you. Stay tuned for updates!
      </p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
