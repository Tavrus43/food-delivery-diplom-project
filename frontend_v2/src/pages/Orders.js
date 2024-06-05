import React from 'react';
import OrderList from '../components/Order/OrderList';

const Orders = () => {
  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <OrderList />
    </div>
  );
};

export default Orders;
