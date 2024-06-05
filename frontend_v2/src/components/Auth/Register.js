import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faImage } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', contactInfo: '', avatar: null });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    dispatch(register(data, navigate));
  };

  return (
    <div className="container mx-auto max-w-md mt-10 bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Reģistrēties</h1>
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
            className="w-full p-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            className="w-full p-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Kontaktinformācija
          </label>
          <input
            type="text"
            name="contactInfo"
            onChange={handleChange}
            value={formData.contactInfo}
            className="w-full p-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">
            <FontAwesomeIcon icon={faImage} className="mr-2" /> Avatar
          </label>
          <div className="flex items-center">
            <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <FontAwesomeIcon icon={faImage} className="mr-2" /> Izvēlieties failu
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {preview && <img src={preview} alt="Avatar Preview" className="w-32 h-32 mt-4 ml-4 rounded-full object-cover" />}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white  p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Reģistrēties
        </button>
      </form>
    </div>
  );
};

export default Register;
