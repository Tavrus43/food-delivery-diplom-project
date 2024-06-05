import { GET_ALL_ORDERS, GET_USER_ORDERS } from '../actions/types';

const initialState = {
  orders: [],
  userOrders: [],
  loading: true,
  error: {}
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default OrderReducer;
