const initialState = {
  addresses: [],
  loading: true,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_ADDRESSES':
      return {
        ...state,
        addresses: action.payload,
        loading: false,
      };
    case 'CREATE_ADDRESS':
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        loading: false,
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map(address =>
          address._id === action.payload._id ? action.payload : address
        ),
        loading: false,
      };
    case 'DELETE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(address => address._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default addressReducer;
