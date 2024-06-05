import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getOwnerMenuItems } from '../../actions/ownerActions';
import api from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const OwnerMenuForm = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.owner.restaurant);
  const menuItems = useSelector((state) => state.owner.menuItems);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: null });
  const [promoData, setPromoData] = useState({ discount: '', startDate: '', endDate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [currentPromoItem, setCurrentPromoItem] = useState(null);

  useEffect(() => {
    if (restaurant._id) {
      dispatch(getOwnerMenuItems(restaurant._id));
    }
  }, [dispatch, restaurant._id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handlePromoChange = (e) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('restaurantId', restaurant._id);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await api.put(`/owner/menu-item/${editingItemId}`, data);
        toast.success('Ēdienkarte veiksmīgi atjaunināta');
      } else {
        await api.post('/owner/menu-item', data);
        toast.success('Ēdienkarte veiksmīgi izveidota');
      }

      setFormData({ name: '', description: '', price: '', image: null });
      setIsEditing(false);
      setEditingItemId(null);
      dispatch(getOwnerMenuItems(restaurant._id));
      setIsModalOpen(false);
    } catch (err) {
      console.error(err.response.data);
      toast.error('Kļūda, lūdzu, mēģiniet vēlreiz');
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, description: item.description, price: item.price, image: null });
    setIsEditing(true);
    setEditingItemId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/owner/menu-item/${id}`);
      toast.success('Ēdienkarte veiksmīgi izdzēsta');
      dispatch(getOwnerMenuItems(restaurant._id));
    } catch (err) {
      console.error(err.response.data);
      toast.error('Kļūda, lūdzu, mēģiniet vēlreiz');
    }
  };

  const handleAddPromo = (item) => {
    setCurrentPromoItem(item);
    setIsPromoModalOpen(true);
  };

  const handlePromoSubmit = async (e) => {
    e.preventDefault();

    const { discount, startDate, endDate } = promoData;
    if (!discount || !startDate || !endDate) {
      return toast.error('Visi lauki ir obligāti');
    }

    try {
      await api.post('/promos', {
        restaurantId: restaurant._id,
        menuItemId: currentPromoItem._id,
        discount: parseInt(discount, 10),
        startDate,
        endDate,
      });

      toast.success('Promo veiksmīgi pievienots');
      setIsPromoModalOpen(false);
    } catch (err) {
      console.error(err.response.data);
      toast.error('Promo pievienošana neizdevās');
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <ToastContainer />
      <button onClick={() => setIsModalOpen(true)} className="bg-gray-600 text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-gray-700 transition-colors">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        {isEditing ? 'Rediģēt Ēdienkarti' : 'Izveidot Ēdienkarti'}
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Menu Item Modal"
      >
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Rediģēt Ēdienkarti' : 'Izveidot Ēdienkarti'}</h2>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Nosaukums</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Apraksts</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Cena</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Attēls</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Saglabāt Ēdienkarti
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isPromoModalOpen}
        onRequestClose={() => setIsPromoModalOpen(false)}
        style={customStyles}
        contentLabel="Promo Modal"
      >
        <form onSubmit={handlePromoSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Pievienot Promo</h2>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Atlaides Procents</label>
            <input
              type="number"
              name="discount"
              value={promoData.discount}
              onChange={handlePromoChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              min="0"
              max="100"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Sākuma Datums</label>
            <input
              type="date"
              name="startDate"
              value={promoData.startDate}
              onChange={handlePromoChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Beigu Datums</label>
            <input
              type="date"
              name="endDate"
              value={promoData.endDate}
              onChange={handlePromoChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Saglabāt Promo
          </button>
        </form>
      </Modal>

      <h2 className="text-2xl font-bold mt-8 mb-4">Ēdienkartes Vienības</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems && menuItems.map((item) => (
          <li key={item._id} className="p-4 border border-gray-300 rounded-lg shadow-md flex flex-col bg-gray-700">
            <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-300 flex-grow">{item.description}</p>
              <p className="text-lg font-bold mb-2">${item.price.toFixed(2)}</p>
              <div className="flex justify-between mt-auto">
                <button onClick={() => handleAddPromo(item)} className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition-colors">
                  <FontAwesomeIcon icon={faTag} className="mr-2" /> Pievienot Promo
                </button>
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center hover:bg-yellow-600 transition-colors">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Rediģēt
                </button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition-colors">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Dzēst
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerMenuForm;
