import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <img src={restaurant.avatar} alt={restaurant.name} className="w-full h-48 object-cover" />
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h2 className="text-xl font-bold">{restaurant.name}</h2>
          <p className="text-gray-400">{restaurant.location}</p>
          <p className="">{restaurant.description}</p>
 
        </div>
        <div>         
          <p className="text-gray-400">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-2xl mr-1 mt-2" />
            {restaurant.averageRating ? restaurant.averageRating.toFixed(1) : 'Nav vērtējumu'}
          </p>
          <Link to={`/restaurants/${restaurant._id}`} className="mt-2 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900 transition ">
            Skatīt Ēdienkarti
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
