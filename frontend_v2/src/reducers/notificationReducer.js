// reducers/notificationReducer.js
const initialState = {
    notifications: [],
    loading: true,
    error: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_NOTIFICATIONS':
        return {
          ...state,
          notifications: action.payload,
          loading: false,
        };
      case 'ADD_NOTIFICATION':
        return {
          ...state,
          notifications: [...state.notifications, action.payload],
        };
      case 'MARK_AS_READ':
        return {
          ...state,
          notifications: state.notifications.map((notification) =>
            notification._id === action.payload ? { ...notification, isRead: true } : notification
          ),
        };
      case 'NOTIFICATION_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  