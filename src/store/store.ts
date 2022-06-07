import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice'

const reducer = combineReducers({
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer,
  })
};

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
