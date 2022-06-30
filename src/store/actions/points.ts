import { createAsyncThunk } from '@reduxjs/toolkit';
import { pointsApi } from '../../requestApi';
import { PointDto, PointType } from '../../types/points';

export const pointsAllRequest = createAsyncThunk(
  'points/getAll',
  async (_, { rejectWithValue }) => {

    try {
      const response = await pointsApi.getAll();

      if (!response) {
        throw new Error('Server error');
      }

      return response;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const pointCreate = createAsyncThunk(
  'points/create',
  async (data: PointDto, { rejectWithValue }) => {

    try {
      const response = await pointsApi.create(data);

      if (!response) {
        throw new Error('Server error');
      }

      return response;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const pointEdit = createAsyncThunk(
  'points/edit',
  async (data: PointType, { rejectWithValue }) => {

    try {
      const response = await pointsApi.edit(data);

      if (!response) {
        throw new Error('Server error');
      }

      return response;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const pointDelete = createAsyncThunk(
  'points/delete',
  async (id: number, { rejectWithValue }) => {

    try {
      const response = await pointsApi.delete(id);

      if (!response) {
        throw new Error('Server error');
      }

      return id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return rejectWithValue(e);
    }
  }
);
