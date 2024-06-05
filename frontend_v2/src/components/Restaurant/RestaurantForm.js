import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const RestaurantForm = () => {
  const [formData, setFormData] = useState({ name: '', location: '', avatar: null, description: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      const res = await api.post('/restaurants', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: 'CREATE_RESTAURANT', payload: res.data });
      toast.success('Restorāns veiksmīgi izveidots');
    } catch (err) {
      toast.error('Neizdevās izveidot restorānu');
      console.error(err.response.data);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Izveidot Restorānu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nosaukums</label>
          <input type="text" name="name" onChange={handleChange} value={formData.name} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Atrašanās vieta</label>
          <input type="text" name="location" onChange={handleChange} value={formData.location} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Apraksts</label>
          <textarea name="description" onChange={handleChange} value={formData.description} className="w-full p-2 border border-gray-300 rounded"></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Attēls</label>
          <input type="file" name="avatar" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Izveidot</button>
      </form>
    </div>
  );
};

export default RestaurantForm;
