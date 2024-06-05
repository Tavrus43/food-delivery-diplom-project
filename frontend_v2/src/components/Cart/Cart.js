import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../../actions/cartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimesCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleContinueShopping = () => {
    navigate('/restaurants');
  };

  return (
    <div className="container mx-auto mt-10 bg-gray-800 text-white p-6 rounded-lg">
      <h1 className="text-2xl mb-4">Pirkumu Grozs</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Jūsu grozs ir tukšs</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-4 border-b pb-4">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-gray-300">${item.price.toFixed(2)}</p>
                <p className="text-gray-300">Daudzums: {item.count}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
              Iztukšot grozu
            </button>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Turpināt iepirkties
            </button>
            <Link
              to="/order"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Veikt pasūtījumu
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
