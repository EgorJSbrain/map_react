import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/usersSlice';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
