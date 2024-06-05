import { GET_OWNER_RESTAURANT, SAVE_OWNER_RESTAURANT, GET_OWNER_MENU_ITEMS, GET_OWNER_ORDERS, UPDATE_ORDER_STATUS } from '../actions/types';

const initialState = {
  restaurant: {},
  menuItems: [],
  orders: [],
};

const ownerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OWNER_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
      };
    case SAVE_OWNER_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
      };
    case GET_OWNER_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
      };
    case GET_OWNER_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        )
      };
    default:
      return state;
  }
};

export default ownerReducer;
