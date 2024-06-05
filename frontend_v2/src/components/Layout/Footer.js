import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-600 p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <p>&copy; {new Date().getFullYear()} Piegādes sistēma. Visas tiesības aizsargātas.</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/privacy" className="text-white hover:underline">Privātuma politika</Link>
          <Link to="/terms" className="text-white hover:underline">Lietošanas noteikumi</Link>
          <Link to="/contact" className="text-white hover:underline">Sazināties ar mums</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
