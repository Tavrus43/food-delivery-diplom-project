import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import RestaurantCard from '../components/Restaurant/RestaurantCard';

const Home = () => {
  const [popularRestaurants, setPopularRestaurants] = useState([]);

  useEffect(() => {
    const fetchPopularRestaurants = async () => {
      try {
        const res = await api.get('/restaurants/popular');
        setPopularRestaurants(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchPopularRestaurants();
  }, []);

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-4xl mb-4">Populāri Restorāni</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Home;
