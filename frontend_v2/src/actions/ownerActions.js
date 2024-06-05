import api from '../utils/api';
import { toast } from 'react-toastify';
import { GET_OWNER_RESTAURANT, SAVE_OWNER_RESTAURANT, GET_OWNER_MENU_ITEMS, GET_OWNER_ORDERS } from './types';

export const getOwnerRestaurant = () => async (dispatch) => {
  try {
    const res = await api.get('/owner/restaurant');
    dispatch({ type: GET_OWNER_RESTAURANT, payload: res.data });
  } catch (err) {
    toast.error('Neizdevās ielādēt restorānu');
    console.error(err.response.data);
  }
};

export const getOwnerMenuItems = () => async (dispatch) => {
  try {
    const res = await api.get('/owner/menu-items');
    dispatch({ type: GET_OWNER_MENU_ITEMS, payload: res.data });
  } catch (err) {
    toast.error('Neizdevās ielādēt ēdienkartes vienības');
    console.error(err.response.data);
  }
};

export const getOwnerOrders = () => async dispatch => {
  console.log("Dispatching getOwnerOrders action");
  try {
    const res = await api.get('/owner/orders');
    console.log("Orders received from server:", res.data);
    dispatch({
      type: GET_OWNER_ORDERS,
      payload: res.data
    });
  } catch (err) {
    toast.error('Neizdevās ielādēt pasūtījumus');
    console.error(err);
  }
};

export const saveOwnerRestaurant = (restaurant, isEditing) => async (dispatch) => {
  try {
    let res;
    if (isEditing) {
      res = await api.put(`/owner/restaurant/${restaurant._id}`, restaurant);
    } else {
      res = await api.post('/owner/restaurant', restaurant);
    }
    dispatch({ type: SAVE_OWNER_RESTAURANT, payload: res.data });
    toast.success('Restorāns veiksmīgi saglabāts');
  } catch (err) {
    toast.error('Neizdevās saglabāt restorānu');
    console.error(err.response.data);
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const res = await api.put(`/owner/orders/${orderId}`, { status });
    console.log("Order status updated:", res.data);
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: res.data });
    toast.success('Pasūtījuma statuss veiksmīgi atjaunināts');
  } catch (err) {
    toast.error('Neizdevās atjaunināt pasūtījuma statusu');
    console.error(err.response.data);
  }
};

export const saveMenuItem = (data, isEditing, itemId) => async (dispatch) => {
  try {
    let res;
    if (isEditing) {
      res = await api.put(`/owner/menu-item/${itemId}`, data);
    } else {
      res = await api.post('/owner/menu-item', data);
    }
    dispatch({ type: 'SAVE_MENU_ITEM', payload: res.data });
    toast.success('Ēdienkartes vienība veiksmīgi saglabāta');
  } catch (err) {
    toast.error('Neizdevās saglabāt ēdienkartes vienību');
    console.error(err.response.data);
  }
};
