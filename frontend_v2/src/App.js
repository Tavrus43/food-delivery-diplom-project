import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Promo from './pages/Promo';
import ProfilePage from './pages/Profile';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CartPage from './pages/Cart';
import RestaurantPage from './pages/Restaurant';
import PrivateRoute from './components/Routing/PrivateRoute';
import AdminRoute from './components/Routing/AdminRoute';
import OwnerRoute from './components/Routing/OwnerRoute';
import OwnerDashboard from './components/Owner/OwnerDashboard';
import RestaurantList from './components/Restaurant/RestaurantList';
import OwnerRestaurantForm from './components/Owner/OwnerRestaurantForm';
import OwnerMenuForm from './components/Owner/OwnerMenuForm';
import OwnerOrders from './components/Owner/OwnerOrders';
import OrderForm from './components/Order/OrderForm';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

const stripePromise = loadStripe('pk_test_51PKImzP9uW9LTOLwiXmEeZGO7bmg1zUp04g0keyD65yTX9ml9hfx0UMYR5xHfveNW4Q0CFmKFT2rqVNt5hF4PQhN006BjcSkZM');
 
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <ErrorBoundary>
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/owner-dashboard" element={<OwnerRoute><OwnerDashboard /></OwnerRoute>} />
          <Route path="/owner/restaurant" element={<OwnerRestaurantForm />} />
          <Route path="/owner/menu" element={<OwnerMenuForm />} />
          <Route path="/owner/orders" element={<OwnerOrders />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/restaurants" element={<RestaurantList />} /> 
          <Route path="/order" element={<PrivateRoute><OrderForm /></PrivateRoute>}/>        
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
    </ErrorBoundary>
  );
};

export default App;
