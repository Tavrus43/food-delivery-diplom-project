import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './types';
import { toast } from 'react-toastify';

export const addToCart = (item) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  const restaurantId = cartItems.length ? cartItems[0].restaurantId : item.restaurantId;
  
  if (restaurantId !== item.restaurantId) {
    toast.error('Jūs varat pasūtīt tikai no viena restorāna vienlaicīgi.');
    return;
  }

  let alreadyExists = false;

  cartItems.forEach((x) => {
    if (x._id === item._id) {
      alreadyExists = true;
      x.count++;
    }
  });

  if (!alreadyExists) {
    const price = item.discount 
      ? Number((item.price - (item.price * item.discount / 100)).toFixed(2))
      : Number(item.price.toFixed(2));
    cartItems.push({ ...item, price, count: 1 });
  }


  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  toast.success('Prece pievienota grozam.');
};

export const removeFromCart = (item) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== item._id);
  
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  toast.success('Prece izņemta no groza.');
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });

  localStorage.removeItem('cartItems');
};
