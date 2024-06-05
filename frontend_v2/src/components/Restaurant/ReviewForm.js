import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const ReviewForm = ({ restaurantId, setNewReview }) => {
  const [formData, setFormData] = useState({ comment: '', rating: 1 });
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/restaurants/review', { ...formData, restaurantId });
      dispatch({ type: 'ADD_REVIEW', payload: res.data });
      toast.success('Atsauksme veiksmīgi pievienota');
      setNewReview(res.data);
      setFormData({ comment: '', rating: 1 });
      setShowForm(false);
    } catch (err) {
      toast.error('Neizdevās pievienot atsauksmi');
      console.error(err.response.data);
    }
  };

  return (
    <div className="mt-6">
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded">
        {showForm ? 'Slēpt Atsauksmes Formu' : 'Pievienot Atsauksmi'}
      </button>
      {showForm && (
        <div className="mt-4">
          <h2 className="text-2xl mb-4">Pievienot Atsauksmi</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Komentārs</label>
              <textarea
                name="comment"
                onChange={handleChange}
                value={formData.comment}
                className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vērtējums</label>
              <select
                name="rating"
                onChange={handleChange}
                value={formData.rating}
                className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Iesniegt</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
