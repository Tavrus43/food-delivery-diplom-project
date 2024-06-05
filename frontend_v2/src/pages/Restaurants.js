import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import RestaurantList from '../components/Restaurant/RestaurantList';
import Pagination from '../components/Layout/Pagination';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get(`/restaurants?page=${page}`);
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchRestaurants();
  }, [page]);

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Restorāni</h1>
      <RestaurantList restaurants={restaurants} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Restaurants;
