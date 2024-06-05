import api from '../utils/api';
import { GET_ALL_ORDERS, GET_USER_ORDERS } from './types';
import { toast } from 'react-toastify';

export const getAllOrders = () => async dispatch => {
  try {
    const res = await api.get('/orders/');
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    toast.error('Neizdevās ielādēt pasūtījumus');
  }
};

export const getUserOrders = () => async (dispatch) => {
  try {
    const res = await api.get('/orders/user');
    dispatch({ type: GET_USER_ORDERS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
