import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OwnerRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  return isAuthenticated && user.userType === 'owner' ? children : <Navigate to="/admin-dashboard" />;
};

export default OwnerRoute;
