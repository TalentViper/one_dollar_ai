import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import authReducer from './authReducer';
import settingReducer from './settingReducer';

export default combineReducers({
  chat: chatReducer,
  auth: authReducer,
  setting: settingReducer
});
