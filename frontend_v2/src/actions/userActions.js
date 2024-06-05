import api from '../utils/api';
import { toast } from 'react-toastify';

export const getUserProfile = () => async (dispatch) => {
  if (localStorage.token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
  } else {
    dispatch({ type: 'AUTH_ERROR' });
    return;
  }

  try {
    const res = await api.get('/users/me');
    dispatch({ type: 'USER_LOADED', payload: res.data });
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR' });
    toast.error(err.response?.data?.msg || 'Neizdevās ielādēt lietotāja profilu');
    console.error(err.response?.data || err.message);
  }
};

export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/users/me', formData);
    dispatch({ type: 'UPDATE_USER_PROFILE', payload: res.data });
    toast.success('Profils veiksmīgi atjaunināts');
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Neizdevās atjaunināt profilu');
    console.error(err.response?.data || err.message);
  }
};

export const updateUserRole = (userId, userType) => async (dispatch) => {
  try {
    const res = await api.put('/users/role', { userId, userType });
    dispatch({ type: 'UPDATE_USER_ROLE', payload: res.data });
    toast.success('Lietotāja loma veiksmīgi atjaunināta');
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Neizdevās atjaunināt lietotāja lomu');
    console.error(err.response?.data || err.message);
  }
};

export const uploadAvatar = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const res = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ type: 'UPLOAD_AVATAR', payload: res.data });
    toast.success('Avatars veiksmīgi augšupielādēts');
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Neizdevās augšupielādēt avataru');
    console.error(err.response?.data || err.message);
  }
};

export const createUser = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/users/create', formData);
    toast.success('Lietotājs veiksmīgi izveidots');
    if (navigate) {
      navigate('/admin');
    }
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Neizdevās izveidot lietotāju');
    console.error(err.response?.data || err.message);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await api.delete(`/users/${userId}`);
    dispatch({ type: 'DELETE_USER', payload: userId });
    toast.success('Lietotājs veiksmīgi izdzēsts');
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Neizdevās izdzēst lietotāju');
    console.error(err.response?.data || err.message);
  }
};

export const getUsers = (page = 1, limit = 10, search = '') => async (dispatch) => {
  try {
    const res = await api.get(`/users?page=${page}&limit=${limit}&search=${search}`);
    dispatch({ type: 'GET_USERS', payload: res.data });
  } catch (err) {
    toast.error(err.response?.data?.msg || 'Neizdevās ielādēt lietotājus');
    console.error(err.response?.data || err.message);
  }
};
