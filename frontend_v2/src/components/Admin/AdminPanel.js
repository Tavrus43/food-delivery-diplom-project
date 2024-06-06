import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { updateUserRole, deleteUser, getUsers } from '../../actions/userActions';
import { getAllOrders } from '../../actions/orderActions';
import CreateUser from './CreateUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash, faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    backgroundColor: '#2D3748',
  },
};

Modal.setAppElement('#root');

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState(''); 
  const [activeTab, setActiveTab] = useState('users'); 
  const dispatch = useDispatch();
  const { users = [], totalPages, currentPage } = useSelector(state => state.user); 
  const { orders } = useSelector(state => state.order); 

  useEffect(() => {
    if (activeTab === 'users') {
      dispatch(getUsers());
    } else if (activeTab === 'orders') {
      dispatch(getAllOrders());
    }
  }, [dispatch, activeTab]);

  const handleRoleChange = (userId, userType) => {
    dispatch(updateUserRole(userId, userType));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo lietotāju?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(getUsers(1, 10, e.target.value));
  };

  const handleOrderSearch = (e) => {
    setOrderSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    dispatch(getUsers(page, 10, search));
  };

  const filteredOrders = orders.filter(order =>
    order.user?.username.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Administrācijas Panelis</h1>
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-blue-700 transition-colors" 
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Izveidot lietotāju
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Create User Modal"
      >
        <CreateUser closeModal={() => setIsModalOpen(false)} />
      </Modal>
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} 
          onClick={() => setActiveTab('users')}
        >
          Lietotāji
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} 
          onClick={() => setActiveTab('orders')}
        >
          Pasūtījumi
        </button>
      </div>

      {activeTab === 'users' && (
        <>
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Meklēt lietotājus..."
              value={search}
              onChange={handleSearch}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute top-3 right-3 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold mt-8 mb-4">Visi Lietotāji</h2>
          <ul className="space-y-4">
            {users.length > 0 ? (
              users.map(user => (
                <li key={user._id} className="p-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{user.username} - {user.userType}</span>
                    <p className="mb-2"><strong>Vārds:</strong> {user.name || 'N/A'}</p>
                    <p className="mb-2"><strong>Kontaktinformācija:</strong> {user.contactInfo || 'N/A'}</p>
                  </div>
                  <div className="flex items-center text-gray-800">
                    <select
                      value={user.userType}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="ml-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="customer">Klients</option>
                      <option value="owner">Restorāna īpašnieks</option>
                      <option value="admin">Administrators</option>
                    </select>
                    <button 
                      onClick={() => handleDelete(user._id)} 
                      className="bg-red-500 text-white px-4 py-2 rounded ml-4 flex items-center hover:bg-red-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" /> Dzēst
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nav atrasts neviens lietotājs</li>
            )}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Iepriekšējā
            </button>
            <span className="font-semibold">Lapa {currentPage} no {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Nākamā <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <>
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Meklēt pasūtījumus pēc klienta..."
              value={orderSearch}
              onChange={handleOrderSearch}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute top-3 right-3 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold mt-8 mb-4">Visi Pasūtījumi</h2>
          <ul className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <li key={order._id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                  <span className="font-semibold">Pasūtījums #{order._id} - {order.status}</span>
                  <p className="mb-2"><strong>Klients:</strong> {order.user?.username || 'Nav zināms'}</p>
                  <p className="mb-2"><strong>Kopā:</strong> ${order.totalAmount.toFixed(2)}</p>
                  <p className="mb-2"><strong>Restorāns:</strong> {order.restaurantId?.name || 'Nav zināms'}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nav atrasts neviens pasūtījums</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
