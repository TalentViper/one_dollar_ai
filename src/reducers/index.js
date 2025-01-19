import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
<<<<<<< Updated upstream
import authReducer from './authReducer';

export default combineReducers({
  chat: chatReducer,
  auth: authReducer
=======
import settingReducer from './settingReducer';

export default combineReducers({
  chat: chatReducer,
  setting: settingReducer
>>>>>>> Stashed changes
});
