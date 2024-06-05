import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerOrders, updateOrderStatus } from '../../actions/ownerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const statusOptions = [
  { value: 'pending', label: 'Gaidīšana', color: 'bg-yellow-400' },
  { value: 'preparing', label: 'Gatavošana', color: 'bg-orange-500' },
  { value: 'delivered', label: 'Piegādāts', color: 'bg-green-500' },
  { value: 'completed', label: 'Pabeigts', color: 'bg-green-700' },
  { value: 'canceled', label: 'Atcelts', color: 'bg-red-500' },
  { value: 'refunded', label: 'Atmaksāts', color: 'bg-purple-500' },
];

const OwnerOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.owner.orders);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getOwnerOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Pasūtījumi</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Meklēt pēc Pasūtījuma ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <button className="p-2 bg-blue-600 text-white rounded-r-md">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <ul className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <li key={order._id} className="p-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl mb-2">Pasūtījums #{order._id}</h2>
                <p className="mb-2"><strong>Klients:</strong> {order.user.username || 'Nezināms'}</p>
                <p className="mb-2"><strong>Kopā:</strong> ${order.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <label className="block mb-2">Statuss</label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`w-full p-2 border border-gray-300 rounded ${statusOptions.find(option => option.value === order.status)?.color}`}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value} className={option.color}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))
        ) : (
          <p>Nav atrasts neviens pasūtījums</p>
        )}
      </ul>
    </div>
  );
};

export default OwnerOrders;
