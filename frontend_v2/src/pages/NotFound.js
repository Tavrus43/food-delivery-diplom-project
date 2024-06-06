import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Lapa nav atrasta</h1>
      <p className="text-lg mb-4">Meklētā lapa neeksistē.</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Doties uz sākumlapu
      </Link>
    </div>
  );
};

export default NotFound;
