const initialState = {
  profile: null,
  loading: true,
  error: null,
  users: [],
  totalPages: 1,
  currentPage: 1,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE':
    case 'USER_LOADED':
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case 'UPDATE_USER_PROFILE':
    case 'UPLOAD-AVATAR':
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case 'UPDATE_USER_ROLE':
      return {
        ...state,
        profile: { ...state.profile, userType: action.payload.userType },
        loading: false,
      };
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload.users,
        totalPages: action.payload.totalPages,
        currentPage: parseInt(action.payload.currentPage, 10)
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
