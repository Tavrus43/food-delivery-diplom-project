import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-xl mt-8 mb-4">Mani Pasūtījumi</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            {order._id} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
