import { combineReducers, createStore } from 'redux';

import UserReducer from './userReducer'

const AppReducers = combineReducers({
    UserReducer
});

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;
