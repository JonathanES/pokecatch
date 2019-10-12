import { combineReducers } from 'redux';

import pokemon from './pokemon';
import userAction from './userAction';
import grid from './grid';

const reducers = combineReducers({
  pokemon, userAction, grid
});

export default reducers;