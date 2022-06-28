import { createAsyncThunk } from "@reduxjs/toolkit";
import { pointsApi } from "../../requestApi";
import { PointDto } from "../../types/points";


export const pointsAllRequest = createAsyncThunk(
  'points/getAll',
  async (_, { rejectWithValue }) => {

    try {
      const response = await pointsApi.getAll();

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

export const pointCreate = createAsyncThunk(
  'points/create',
  async (data: PointDto, { rejectWithValue }) => {

    try {
      const response = await pointsApi.create(data);

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
