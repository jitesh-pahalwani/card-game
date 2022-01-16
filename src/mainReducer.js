import { combineReducers } from 'redux';
import homeReducer from './Components/Home/reducer';

const mainReducer = combineReducers({
  homeReducer: homeReducer,
});

export default mainReducer