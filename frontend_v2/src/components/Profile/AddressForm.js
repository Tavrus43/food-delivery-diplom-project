import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createAddress, updateAddress } from '../../actions/addressActions';

const AddressForm = ({ address, isEditing = false, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    address: '',
    zip: '',
    isDefault: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      setFormData({
        address: address.address || '',
        zip: address.zip || '',
        isDefault: address.isDefault || false,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await dispatch(updateAddress(address._id, formData));
    } else {
      await dispatch(createAddress(formData));
    }
    if (onSave) onSave();
    if (onCancel) onCancel();
    setFormData({
      address: '',
      zip: '',
      isDefault: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Rediģēt Adresi' : 'Pievienot Adresi'}</h2>
      <div className="mb-4">
        <label className="block   text-white font-bold mb-2">Adrese:</label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
          className="w-full p-2 borde text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
        />
      </div>
      <div className="mb-4">
        <label className="block  text-white font-bold mb-2">Pasta indekss:</label>
        <input 
          type="text" 
          name="zip" 
          value={formData.zip} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
        />
      </div>
      <div className="mb-4 flex text-gray-600 items-center">
        <input 
          type="checkbox" 
          name="isDefault" 
          checked={formData.isDefault} 
          onChange={handleChange} 
          className="mr-2 leading-tight" 
        />
        <label className="text-white">Iestatīt kā noklusējuma adresi</label>
      </div>
      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={onCancel} 
          className="bg-gray-600  px-4 py-2 text-white rounded mr-2 hover:bg-gray-700 transition-colors"
        >
          Atcelt
        </button>
        <button 
          type="submit" 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Atjaunināt Adresi' : 'Pievienot Adresi'}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
