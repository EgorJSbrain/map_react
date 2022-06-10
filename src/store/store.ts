import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authAPI } from '../services/AuthService';
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/usersSlice';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
