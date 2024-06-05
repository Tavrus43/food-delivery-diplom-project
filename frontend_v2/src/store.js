import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import addressReducer from './reducers/addressReducer';
import ownerReducer from './reducers/ownerReducer';
import restaurantReducer from './reducers/resReducer';
import orderReducer from './reducers/orderReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
  addresses: addressReducer,
  owner: ownerReducer,
  restaurant: restaurantReducer,
  order: orderReducer,
  notifications: notificationReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
