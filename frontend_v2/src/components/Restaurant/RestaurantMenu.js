import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRestaurantById, getMenuItemsByRestaurant } from '../../actions/restaurantActions';
import { addToCart } from '../../actions/cartActions';

const RestaurantMenu = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const restaurant = useSelector(state => state.restaurant.currentRestaurant);
  const menuItems = useSelector(state => state.restaurant.menuItems);

  useEffect(() => {
    dispatch(getRestaurantById(id));
    dispatch(getMenuItemsByRestaurant(id));
  }, [dispatch, id]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (!restaurant) {
    return <p>Notiek ielāde...</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h1 className="text-3xl mb-6">Ēdienkarte</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems && menuItems.map(item => (
          <div key={item._id} className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
            <div>
              <img src={item.imageUrl} alt={item.name} className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-400">{item.description}</p>
                <p className="text-white font-bold">€{item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-center p-4">
              <button onClick={() => handleAddToCart(item)} className="mt-2 inline-block bg-green-800 hover:bg-green-500 text-white px-4 py-2 rounded">
                Pievienot Grozam
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
