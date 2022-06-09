import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authAPI } from '../services/AuthService';
import { userAPI } from '../services/UserService';
import userReducer from './reducers/UserSlice'

const reducer = combineReducers({
  userReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      userAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
