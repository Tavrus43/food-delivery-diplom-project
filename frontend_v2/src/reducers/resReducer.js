import { GET_RESTAURANTS, GET_RESTAURANT_BY_ID, GET_MENU_ITEMS_BY_RESTAURANT } from '../actions/types';

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  menuItems: [],
  totalPages: 1,
  currentPage: 1,
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload.restaurants, // Extracting the array from the payload
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case GET_RESTAURANT_BY_ID:
      return {
        ...state,
        currentRestaurant: action.payload,
      };
    case GET_MENU_ITEMS_BY_RESTAURANT:
      return {
        ...state,
        menuItems: action.payload,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
