// components/layout/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { FiSearch } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import Notifications from '../Notification/Notifications';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('cartItems');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header className="bg-cover bg-center h-64 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600">
        <div className="container mx-auto flex justify-between items-center h-full">
          <img src="https://img.logoipsum.com/288.svg" alt="Logo" className="h-16" />
          <h1 className="text-white text-4xl font-bold">Piegādes sistēma</h1>
        </div>
      </header>
      <nav className="bg-gray-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Populāri</Link>
            <Link to="/restaurants" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Restorāni</Link>
            <Link to="/promo" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Promo</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center w-full max-w-md bg-white rounded-md shadow-md">
              <input
                type="text"
                placeholder="Meklēt..."
                className="w-full p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="p-4 bg-gray-500 text-white rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <FiSearch />
              </button>
            </div>

            <Link to="/cart" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white flex items-center">
              <IoCartOutline className="text-xl" />
              <span className="ml-1">{cartItems.length}</span>
            </Link>
            {isAuthenticated ? (
              <><div className="relative">
                  <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white flex items-center">
                    <FaBell className="text-xl" />
                  </button>
                  <Notifications isOpen={isNotificationsOpen} />
                </div>
                {user?.avatar && <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full ml-4" />}
                <Link to="/profile" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">{user?.username}</Link>
                {user?.userType === 'admin' && (
                  <Link to="/admin" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Admin</Link>
                )}
                {user?.userType === 'owner' && (
                  <Link to="/owner-dashboard" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Īpašnieks</Link>
                )}

                <button onClick={handleLogout} className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Izrakstīties</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Pieteikties</Link>
                <Link to="/register" className="text-white px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white">Reģistrēties</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
