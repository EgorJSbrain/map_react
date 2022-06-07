import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";
import { fetchUser } from "./actionCreators";

interface UserState {
  user: UserType | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [fetchUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})


export default userSlice.reducer;