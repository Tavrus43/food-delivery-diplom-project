import api from '../utils/api';
import { toast } from 'react-toastify';

export const getUserAddresses = () => async (dispatch) => {
  try {
    const res = await api.get('/users/addresses');
    dispatch({ type: 'GET_USER_ADDRESSES', payload: res.data });
  } catch (err) {
    toast.error('Neizdevās ielādēt adreses');
    console.error(err.response.data);
  }
};

export const createAddress = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/address', formData);
    dispatch({ type: 'CREATE_ADDRESS', payload: res.data });
    toast.success('Adrese veiksmīgi pievienota');
  } catch (err) {
    toast.error('Neizdevās pievienot adresi');
    console.error(err.response.data);
  }
};

export const updateAddress = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/users/address/${id}`, formData);
    dispatch({ type: 'UPDATE_ADDRESS', payload: res.data });
    toast.success('Adrese veiksmīgi atjaunināta');
  } catch (err) {
    toast.error('Neizdevās atjaunināt adresi');
    console.error(err.response.data);
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  try {
    await api.delete(`/users/address/${id}`);
    dispatch({ type: 'DELETE_ADDRESS', payload: id });
    toast.success('Adrese veiksmīgi izdzēsta');
  } catch (err)  {
    dispatch({ type: 'ADDRESS_ERROR', payload: err.response.data });
    toast.error('Neizdevās izdzēst adresi');
    console.error(err.response.data);
  }
};
