import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClipboardList, faConciergeBell } from '@fortawesome/free-solid-svg-icons';

const OwnerDashboard = () => {
  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Īpašnieka Panelis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/owner/restaurant" className="block bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 flex items-center space-x-4">
          <FontAwesomeIcon icon={faUtensils} className="text-2xl" />
          <span>Pārvaldīt Restorānu</span>
        </Link>
        <Link to="/owner/menu" className="block bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 flex items-center space-x-4">
          <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
          <span>Pārvaldīt Ēdienkarti</span>
        </Link>
        <Link to="/owner/orders" className="block bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 flex items-center space-x-4">
          <FontAwesomeIcon icon={faConciergeBell} className="text-2xl" />
          <span>Pārvaldīt Pasūtījumus</span>
        </Link>
      </div>
    </div>
  );
};

export default OwnerDashboard;
