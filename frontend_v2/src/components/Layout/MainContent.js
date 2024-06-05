import React from 'react';
import ProfilePage from '../../pages/Profile';
import AdminPanel from '../Admin/AdminPanel';
import OwnerDashboard from '../Owner/OwnerDashboard';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const MainContent = ({ mainContent }) => {
  switch (mainContent) {
    case 'profile':
      return <ProfilePage />;
    case 'admin':
      return <AdminPanel />;
    case 'owner':
      return <OwnerDashboard />;
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    default:
      return <div>Select an option from the sidebar</div>;
  }
};

export default MainContent;
