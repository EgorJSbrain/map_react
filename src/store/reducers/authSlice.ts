import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { userAuth, userLogOut } from '../actions';
import { UserType } from '../../types';

interface AuthState {
  user: UserType | null;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSet(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: {
    [userAuth.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [userAuth.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userAuth.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [userLogOut.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
      state.user = null;
    },
    [userLogOut.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userLogOut.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
});

export const { userSet } = authSlice.actions;

export default authSlice.reducer;