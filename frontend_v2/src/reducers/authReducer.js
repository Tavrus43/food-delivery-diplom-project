const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'UPDATE_USER_ROLE':
      return {
        ...state,
        user: { ...state.user, userType: action.payload.userType },
      };
    case 'UPLOAD_AVATAR':
      return {
        ...state,
        user: { ...state.user, avatar: action.payload.avatar },
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('cartItems'); 
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
