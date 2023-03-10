import {combineReducers} from 'redux';
import container from './container.js';
import popup from './popup';
const reducers = combineReducers(
    {container, popup},

);
export default reducers;
