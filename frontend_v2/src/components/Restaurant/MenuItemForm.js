import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const MenuItemForm = ({ restaurantId }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: null });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('restaurantId', restaurantId);

      const res = await api.post('/restaurants/menu-item', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: 'ADD_MENU_ITEM', payload: res.data });
      toast.success('Ēdienkartes vienība veiksmīgi pievienota');
    } catch (err) {
      toast.error('Neizdevās pievienot ēdienkartes vienību');
      console.error(err.response.data);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Pievienot Ēdienkartes Vienību</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nosaukums</label>
          <input type="text" name="name" onChange={handleChange} value={formData.name} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Apraksts</label>
          <input type="text" name="description" onChange={handleChange} value={formData.description} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cena</label>
          <input type="text" name="price" onChange={handleChange} value={formData.price} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Attēls</label>
          <input type="file" name="image" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-gray-500  hover:bg-gray-900 text-white px-4 py-2 rounded">Pievienot</button>
      </form>
    </div>
  );
};

export default MenuItemForm;
