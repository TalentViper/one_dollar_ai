import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import authReducer from './authReducer';

export default combineReducers({
  chat: chatReducer,
  auth: authReducer
});
