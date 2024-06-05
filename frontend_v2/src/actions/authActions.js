import api from '../utils/api';
import { toast } from 'react-toastify';

export const loadUser = () => async (dispatch) => {
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
  }
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/auth/login', formData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: res.data.user, token: res.data.token } });
    localStorage.setItem('token', res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    toast.success('Pieteikšanās veiksmīga');
    navigate('/');
    dispatch(loadUser());
  } catch (err) {
    toast.error('Nepareizi akreditācijas dati');
    console.error(err.response.data);
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Reģistrācija veiksmīga');
    navigate('/login');
  } catch (err) {
    toast.error(err.response.data.msg || 'Neizdevās reģistrēties');
    console.error(err.response.data);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('cartItems');
  delete api.defaults.headers.common['Authorization'];
  dispatch({ type: 'LOGOUT' });
  toast.success('Izrakstīšanās veiksmīga');
};
