import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../services/AuthService";
import { UserType } from "../../types";

interface AuthState {
  user: UserType | null;
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers:
  (builder) => {
    builder.addMatcher(
      authAPI.endpoints.fetchLogIn.matchFulfilled,
      (state, { payload }) => {
        state.user = payload as UserType
      }
    )
  },
})

export default authSlice.reducer;