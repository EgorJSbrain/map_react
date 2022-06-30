import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UserType } from '../../types';
import { usersAllRequest } from '../actions/users';

interface UsersState {
  users: UserType[];
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [usersAllRequest.fulfilled.type]: (state, action: PayloadAction<UserType[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [usersAllRequest.pending.type]: (state) => {
      state.isLoading = true;
    },
    [usersAllRequest.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
});

export default usersSlice.reducer;