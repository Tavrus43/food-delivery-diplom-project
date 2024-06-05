import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getOwnerRestaurant, saveOwnerRestaurant } from '../../actions/ownerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMapMarkerAlt, faFileAlt, faImage } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: '#2D3748',
  },
};

Modal.setAppElement('#root');

const cuisinesOptions = ['Itāļu', 'Ķīniešu', 'Indiešu', 'Meksikāņu', 'Japāņu'];

const OwnerRestaurantForm = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.owner.restaurant);
  const [formData, setFormData] = useState({ name: '', location: '', description: '', cuisines: [], image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getOwnerRestaurant());
  }, [dispatch]);

  useEffect(() => {
    if (restaurant && restaurant._id) {
      setFormData({
        name: restaurant.name || '',
        location: restaurant.location || '',
        description: restaurant.description || '',
        cuisines: restaurant.cuisines || [],
        image: null
      });
      setPreviewImage(restaurant.avatar || null);
    } else {
      setFormData({ name: '', location: '', description: '', cuisines: [], image: null });
      setPreviewImage(null);
    }
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else if (name === 'cuisines') {
      const cuisines = [...formData.cuisines];
      if (cuisines.includes(value)) {
        setFormData({ ...formData, cuisines: cuisines.filter(cuisine => cuisine !== value) });
      } else {
        setFormData({ ...formData, cuisines: [...cuisines, value] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('description', formData.description);
    formData.cuisines.forEach(cuisine => {
      data.append('cuisines', cuisine);
    });
    if (formData.image) {
      data.append('image', formData.image);
    }
    dispatch(saveOwnerRestaurant(data, !!restaurant && !!restaurant._id));
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        {restaurant && restaurant._id ? 'Rediģēt Restorānu' : 'Izveidot Restorānu'}
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel={restaurant && restaurant._id ? 'Edit Restaurant Modal' : 'Create Restaurant Modal'}
      >
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{restaurant && restaurant._id ? 'Rediģēt Restorānu' : 'Izveidot Restorānu'}</h2>
          <div className="mb-4">
            <label className="block mb-2 font-bold"><FontAwesomeIcon icon={faUtensils} className="mr-2" /> Nosaukums</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Atrašanās vieta</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold"><FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Apraksts</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Izvēlies ēdiena kategorijas</label>
            <div className="flex flex-wrap">
              {cuisinesOptions.map(cuisine => (
                <label key={cuisine} className="mr-4 mb-2">
                  <input
                    type="checkbox"
                    name="cuisines"
                    value={cuisine}
                    checked={formData.cuisines.includes(cuisine)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {cuisine}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold"><FontAwesomeIcon icon={faImage} className="mr-2" /> Attēls</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          {previewImage && (
            <div className="mb-4">
              <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}
          <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            {restaurant && restaurant._id ? 'Saglabāt Izmaiņas' : 'Izveidot Restorānu'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default OwnerRestaurantForm;
