import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'customer',
    name: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, password, userType, name } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createUser({
      username: username || 'Nav norādīts',
      password,
      userType,
      name: name || 'Nav norādīts'
    }, navigate));
    closeModal();
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Izveidot lietotāju</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2">Lietotājvārds:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            className="w-full p-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Parole:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Vārds:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Lietotāja tips:</label>
          <select
            name="userType"
            value={userType}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="customer">Klients</option>
            <option value="owner">Restorāna īpašnieks</option>
            <option value="admin">Administrators</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Izveidot lietotāju
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
