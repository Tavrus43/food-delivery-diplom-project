import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setMainContent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="fixed top-16 right-0 w-1/5 h-full bg-gray-100 p-4 shadow-lg">
      <div className="mt-4">
        {isAuthenticated ? (
          <div className="text-center">
            <div className="relative inline-block">
              {user?.avatar && <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />}
              <FontAwesomeIcon icon={faBell} className="absolute bottom-0 right-0 text-yellow-500 bg-white rounded-full p-1 border border-gray-300" />
            </div>
            <button onClick={() => setMainContent('profile')} className="block text-blue-600 mb-2 text-lg">{user?.username}</button>
            {user?.userType === 'admin' && (
              <button onClick={() => setMainContent('admin')} className="block text-blue-600 mb-2 text-lg">Admin Panel</button>
            )}
            {user?.userType === 'owner' && (
              <button onClick={() => setMainContent('owner')} className="block text-blue-600 mb-2 text-lg">Owner Dashboard</button>
            )}
            <button onClick={handleLogout} className="block text-red-600 mb-2 text-lg">Logout</button>
          </div>
        ) : (
          <div className="text-center">
            <button onClick={() => setMainContent('login')} className="block text-blue-600 mb-2 text-lg">Login</button>
            <button onClick={() => setMainContent('register')} className="block text-blue-600 mb-2 text-lg">Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
