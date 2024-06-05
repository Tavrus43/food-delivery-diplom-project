import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/restaurant');
        setOrders(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl mt-8 mb-4">Restorāna Pasūtījumi</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="p-4 border border-gray-300 rounded mb-4">
            {order._id} - {order.status}
            <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="ml-4 p-2 border border-gray-300 rounded bg-gray-800 text-white">
              <option value="pending">Gaidīšana</option>
              <option value="preparing">Gatavošana</option>
              <option value="delivered">Piegādāts</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantOrders;
