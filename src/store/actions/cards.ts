import { createAsyncThunk } from "@reduxjs/toolkit";
import { cardsApi } from "../../requestApi";
import { CardDto } from "../../types";

export const cardsAllRequest = createAsyncThunk(
  'cards/getAll',
  async (_, { rejectWithValue }) => {

    try {
      const response = await cardsApi.getAll();

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

export const cardCreate = createAsyncThunk(
  'cards/create',
  async (data: CardDto, { rejectWithValue }) => {

    try {
      const response = await cardsApi.create(data);

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
