import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import api from '../../utils/api';

const Reviews = ({ restaurantId, newReview }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/restaurants/${restaurantId}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchReviews();
  }, [restaurantId, newReview]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-4">Atsauksmes</h2>
      <ul>
        {reviews.map(review => (
          <li key={review._id} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-800 text-white">
            <div className="flex items-center mb-2">
              <img src={review.userId.avatar} alt={review.userId.username} className="w-10 h-10 rounded-full mr-3" />
              <p className="font-bold">{review.userId.username}</p>
            </div>
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
            </div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
