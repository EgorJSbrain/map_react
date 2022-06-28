import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../requestApi";
import { UserType } from "../../types";

export const usersAllRequest = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {

    try {
      const response = await userApi.getAll();

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

export const userRegister = createAsyncThunk(
  'users/addUser',
  async (data: UserType, { rejectWithValue }) => {
    try {
      const response = await userApi.register(data);

      if (!response.ok) {
        throw new Error('Server error')
      }

      return response.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
);
