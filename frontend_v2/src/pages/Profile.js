import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getUserProfile, updateUserProfile, uploadAvatar } from '../actions/userActions';
import { getUserAddresses, deleteAddress } from '../actions/addressActions';
import { getUserOrders } from '../actions/orderActions';
import AddressForm from '../components/Profile/AddressForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash, faMapMarkerAlt, faPhone, faBox, faDollarSign, faUtensils, faImage } from '@fortawesome/free-solid-svg-icons';

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

const statusLabels = {
  pending: 'Gaidīšana',
  preparing: 'Gatavošana',
  in_transit: 'Ceļā',
  delivered: 'Piegādāts',
  completed: 'Pabeigts',
  canceled: 'Atcelts',
  refunded: 'Atmaksāts',
};

const statusColors = {
  pending: 'bg-yellow-500',
  preparing: 'bg-orange-500',
  in_transit: 'bg-blue-500',
  delivered: 'bg-green-500',
  completed: 'bg-green-700',
  canceled: 'bg-red-500',
  refunded: 'bg-purple-500',
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { addresses, loading: addressesLoading } = useSelector((state) => state.addresses);
  const { userOrders, loading: ordersLoading } = useSelector((state) => state.order);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    contactInfo: '',
    name: '',
    avatar: null,
  });

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserAddresses());
    dispatch(getUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        contactInfo: user.contactInfo || '',
        name: user.name || '',
        avatar: user.avatar || null,
      });
    }
  }, [user]);

  const { username, contactInfo, name, avatar } = formData;

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    if (formData.avatar instanceof File) {
      dispatch(uploadAvatar(formData.avatar)).then(() => {
        dispatch(updateUserProfile(formData)).then(() => {
          dispatch(getUserProfile());
          setIsProfileModalOpen(false);
        });
      });
    } else {
      dispatch(updateUserProfile(formData)).then(() => {
        dispatch(getUserProfile());
        setIsProfileModalOpen(false);
      });
    }
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id));
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    dispatch(getUserAddresses());
    setIsAddressModalOpen(false);
  };

  if (userLoading || addressesLoading || ordersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Profils</h1>
      <div className="flex items-center mb-4">
        <div className="relative">
          <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full mr-4 object-cover shadow-md" />
          <button
            className="absolute bottom-0 right-0 bg-gray-600 text-white rounded-full p-2 shadow-md hover:bg-gray-700 transition-colors"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{username}</h2>
          <p className="text-gray-300">
            <FontAwesomeIcon icon={faPhone} /> {contactInfo}
          </p>
        </div>
      </div>
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setIsProfileModalOpen(false)}
        style={customStyles}
        contentLabel="Rediģēt profilu"
      >
        <form onSubmit={onSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Rediģēt profilu</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Lietotājvārds:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block t font-bold mb-2">Kontaktinformācija:</label>
            <input
              type="text"
              name="contactInfo"
              value={contactInfo}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Vārds:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">
              <FontAwesomeIcon icon={faImage} className="mr-2" /> Avatar
            </label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <FontAwesomeIcon icon={faImage} className="mr-2" /> Izvēlieties failu
                <input type="file" name="avatar" onChange={onChange} className="hidden" />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Saglabāt profilu
          </button>
        </form>
      </Modal>
      <h2 className="text-2xl font-bold mt-8 mb-4">Adreses</h2>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-blue-700 transition-colors"
        onClick={handleAddAddress}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Pievienot adresi
      </button>
      <Modal
        isOpen={isAddressModalOpen}
        onRequestClose={() => setIsAddressModalOpen(false)}
        style={customStyles}
        contentLabel="Adreses modālis"
      >
        <AddressForm
          address={editingAddress}
          isEditing={!!editingAddress}
          onCancel={() => setIsAddressModalOpen(false)}
          onSave={handleSaveAddress}
        />
      </Modal>
      <ul className="space-y-4">
        {addresses.map((address) => (
          <li key={address._id} className="p-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {address.address}
              </p>
              <p className="text-gray-300">{address.zip}</p>
              {address.isDefault && <p className="text-green-500 font-bold">Noklusējuma adrese</p>}
            </div>
            <div className="flex items-center">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 flex items-center hover:bg-yellow-600 transition-colors"
                onClick={() => handleEditAddress(address)}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Rediģēt
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteAddress(address._id)}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" /> Dzēst
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">Mani pasūtījumi</h2>
      <ul className="space-y-4">
        {userOrders.map((order) => (
          <li key={order._id} className="p-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center bg-gray-900">
            <div className="flex-1">
              <p className="text-lg font-semibold">
                <FontAwesomeIcon icon={faBox} className="mr-2" /> Pasūtījums #{order._id}
              </p>
              <p className="text-gray-300">
                <FontAwesomeIcon icon={faUtensils} className="mr-2" /> <strong>Restorāns:</strong> {order.restaurantId?.name || 'Nezināms'}
              </p>
              <p className="text-gray-300">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> <strong>Kopā:</strong> ${order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className={`p-2 rounded text-white ${statusColors[order.status]}`}>
              <strong>Statuss:</strong> {statusLabels[order.status]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
