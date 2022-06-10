import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAddRequest, usersAllRequest } from "../../requestApi";
import { UserType } from "../../types";

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {

    try {
      const response = await usersAllRequest();

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

export const addUser = createAsyncThunk(
  'users/addUser',
  async (data: UserType, { rejectWithValue }) => {
    try {
      const response = await userAddRequest(data);

      if (!response.ok) {
        throw new Error('Server error')
      }

      return response.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
);
