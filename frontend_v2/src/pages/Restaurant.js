import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getMenuItemsByRestaurant } from '../actions/restaurantActions';
import Reviews from '../components/Restaurant/Reviews';
import ReviewForm from '../components/Restaurant/ReviewForm';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant.currentRestaurant);
  const [newReview, setNewReview] = useState(null);

  useEffect(() => {
    dispatch(getRestaurantById(id));
    dispatch(getMenuItemsByRestaurant(id));
  }, [dispatch, id]);

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      {restaurant && (
        <div className="mb-6">
          <img src={restaurant.avatar} alt={restaurant.name} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-300">{restaurant.location}</p>
          <p className="text-gray-300">{restaurant.description}</p>
        </div>
      )}
      <RestaurantMenu restaurantId={id} />
      <ReviewForm restaurantId={id} setNewReview={setNewReview} />
      <Reviews restaurantId={id} newReview={newReview} />
    </div>
  );
};

export default RestaurantPage;
