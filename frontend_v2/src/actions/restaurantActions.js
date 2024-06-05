import api from '../utils/api';
import { GET_RESTAURANTS, GET_RESTAURANT_BY_ID, GET_MENU_ITEMS_BY_RESTAURANT } from './types';

export const getRestaurants = ({ page = 1, cuisine = '', rating = '', price = '', popular = false }) => async (dispatch) => {
  try {
    const res = await api.get(`/restaurants`, {
      params: { page, cuisine, rating, price, popular }
    });
    console.log('API Response:', res.data);

    dispatch({
      type: GET_RESTAURANTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRestaurantById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/restaurants/${id}`);
    dispatch({ type: GET_RESTAURANT_BY_ID, payload: res.data });
  } catch (err) {
    console.error(err.response.data);
  }
};

export const getMenuItemsByRestaurant = (restaurantId) => async (dispatch) => {
  try {
    const res = await api.get(`/restaurants/${restaurantId}/menu-items`);
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT, payload: res.data });
  } catch (err) {
    console.error(err.response.data);
  }
};
