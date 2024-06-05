import api from '../utils/api';
import { toast } from 'react-toastify';

export const getNotifications = () => async (dispatch) => {
  try {
    const res = await api.get('/notifications');
    dispatch({ type: 'GET_NOTIFICATIONS', payload: res.data });
  } catch (err) {
    toast.error('Neizdevās ielādēt paziņojumus');
    console.error(err.response.data);
  }
};

export const markAsRead = (notificationId) => async (dispatch) => {
  try {
    await api.put(`/notifications/${notificationId}/mark-as-read`);
    dispatch({ type: 'MARK_AS_READ', payload: notificationId });
  } catch (err) {
    toast.error('Neizdevās atzīmēt kā lasītu');
    console.error(err.response.data);
  }
};