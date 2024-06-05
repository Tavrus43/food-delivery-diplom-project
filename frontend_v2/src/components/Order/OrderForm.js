import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { getUserAddresses } from '../../actions/addressActions';
import api from '../../utils/api';

const stripePromise = loadStripe('pk_test_51PKImzP9uW9LTOLwiXmEeZGO7bmg1zUp04g0keyD65yTX9ml9hfx0UMYR5xHfveNW4Q0CFmKFT2rqVNt5hF4PQhN006BjcSkZM');

const OrderForm = () => {
  const [formData, setFormData] = useState({ address: '' });
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const { addresses, loading: addressesLoading } = useSelector(state => state.addresses); 
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (!addressesLoading && addresses && addresses.length > 0) {
      const defaultAddress = addresses.find(address => address.isDefault);
      setFormData({ address: defaultAddress ? defaultAddress.address : addresses[0].address });
    }
  }, [addresses, addressesLoading]);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount();
    const stripe = await stripePromise;

    try {
      const res = await api.post('/payments/create-checkout-session', {
        items: cartItems,
        address: formData.address,
      });

      const { id: sessionId } = res.data;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error(error);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Veikt Pasūtījumu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Adrese</label>
          <select
            name="address"
            onChange={handleChange}
            value={formData.address}
            className="w-full p-2 border border-gray-300 text-gray-700 rounded"
          >
            {!addressesLoading && addresses && addresses.length > 0 ? (
              addresses.map(address => (
                <option key={address._id} value={address.address}>
                  {address.address} {address.isDefault && '(Galvenais)'}
                </option>
              ))
            ) : (
              <option value="">Nav pieejamu adrešu</option>
            )}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Veikt Pasūtījumu</button>
      </form>
    </div>
  );
};

export default OrderForm;
