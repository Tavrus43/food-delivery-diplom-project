import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../actions/cartActions';

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await api.get('/promos');
        setPromos(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchPromos();
  }, []);

  const handleAddToCart = (promo) => {
    const menuItem = promo.menuItemId;
    if (!menuItem.price) {
      console.error('Item does not have a price:', menuItem);
      return;
    }
    const item = {
      ...menuItem,
      restaurantId: promo.restaurantId._id,
      discount: promo.discount,
    };
    dispatch(addToCart(item));
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Promo</h1>
      <p className="text-lg mb-4">Apskatiet mūsu jaunākos piedāvājumus un atlaides!</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo) => {
          const menuItem = promo.menuItemId;
          return (
            <li key={promo._id} className="p-4 border border-gray-700 rounded-lg shadow-md">
              <img src={menuItem.imageUrl} alt={menuItem.name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{menuItem.name}</h3>
                <p className="text-sm text-gray-300">{menuItem.description}</p>
                <p className="text-sm text-gray-300">Restorāns: {promo.restaurantId.name}</p>
                <p className="text-lg font-bold mt-2">Atlaide: {promo.discount}%</p>
                <p className="text-sm text-gray-300">Sākuma datums: {new Date(promo.startDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-300">Beigu datums: {new Date(promo.endDate).toLocaleDateString()}</p>
                {menuItem.price ? (
                  <div>
                    <p className="text-sm text-gray-300">Cena: €{menuItem.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-300">Cena ar atlaidi: €{calculateDiscountedPrice(menuItem.price, promo.discount)}</p>
                    <button
                      onClick={() => handleAddToCart(promo)}
                      className="mt-4 bg-gray-400 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-gray-900 transition-colors"
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="mr-2" /> Pievienot grozam
                    </button>
                  </div>
                ) : (
                  <p className="text-red-500 mt-4">Nav cenas informācijas</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Promo;
