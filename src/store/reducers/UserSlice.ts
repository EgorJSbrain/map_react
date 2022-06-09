import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../services/AuthService";
import { UserType } from "../../types";

interface UserState {
  user: UserType | null;
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
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

export default userSlice.reducer;