import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../requestApi";
import { authUserData, UserType } from "../../types";
import { usersAllRequest } from "./users";

export const userAuth = createAsyncThunk(
  'auth/logIn',
  async (authData: authUserData, { rejectWithValue, dispatch }) => {

    try {
      const usersRes = await dispatch(usersAllRequest());
      let response;

      if (usersRes.payload && !!usersRes.payload.length) {
        const users: UserType[] = usersRes.payload;
        const currentUser = users.find(user => user.email === authData.email);

        if (currentUser) {
          const authRes = await authApi.auth(authData);

          if (authRes) {
            response = currentUser;
            localStorage.setItem('user', JSON.stringify(currentUser));
          }
        } else {
          throw new Error('Server error')
        }
      }

      if (!response) {
        throw new Error('Server error')
      }

      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e)
    }
  }
);

export const userLogOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {

    try {
      const response = await authApi.logOut();

      if (!response) {
        throw new Error('Server error')
      }

      localStorage.removeItem('user');
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e)
    }
  }
);
