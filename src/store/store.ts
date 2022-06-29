import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/usersSlice';
import pointsReducer from './reducers/pointsSlice';
import cardsReducer from './reducers/cardsSlice';

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  points: pointsReducer,
  cards: cardsReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
