import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  return isAuthenticated && user.userType === 'admin' ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
