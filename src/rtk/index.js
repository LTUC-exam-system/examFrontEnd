import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import students from './students.store';
import users from './users.store';
const reducers = combineReducers({students:students,users:users})
const store = configureStore({ reducer: reducers});

export default store;