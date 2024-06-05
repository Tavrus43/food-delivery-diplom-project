import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  return (
    <div className="container mx-auto max-w-md mt-10 bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Pieteikties</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Lietotājvārds
          </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="w-full p-2 border border-gray-300 text-gray text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">
            <FontAwesomeIcon icon={faLock} className="mr-2" /> Parole
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Pieteikties
        </button>
      </form>
    </div>
  );
};

export default Login;
