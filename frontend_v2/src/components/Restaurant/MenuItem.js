import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <div className="p-4 border rounded mb-4 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p>{item.description}</p>
        <p className="font-bold">${item.price.toFixed(2)}</p>
        <img src={item.imageUrl} alt={item.name} className="mt-2 w-full h-32 object-cover rounded" />
      </div>
      <div>      
        <button onClick={handleAddToCart} className="bg-gray-500 text-white  hover:bg-gray-900  px-4 py-2 rounded mt-2">Pievienot Grozam</button>
      </div>

    </div>
  );
};

export default MenuItem;
