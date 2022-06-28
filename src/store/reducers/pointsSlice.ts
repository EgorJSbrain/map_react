import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { PointType } from "../../types";
import { pointsAllRequest } from "../actions";
import { pointCreate } from "../actions/points";

interface PointsState {
  points: PointType[];
  isLoading: boolean;
  error: string;
}

const initialState: PointsState = {
  points: [],
  isLoading: false,
  error: '',
}

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {},
  extraReducers: {
    [pointsAllRequest.fulfilled.type]: (state, action: PayloadAction<PointType[]>) => {
      state.isLoading = false;
      state.error = '';
      state.points = action.payload;
    },
    [pointsAllRequest.pending.type]: (state) => {
      state.isLoading = true;
    },
    [pointsAllRequest.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [pointCreate.fulfilled.type]: (state, action: PayloadAction<PointType>) => {
      state.isLoading = false;
      state.error = '';
      state.points = [...state.points, action.payload];
    },
    [pointCreate.pending.type]: (state) => {
      state.isLoading = true;
    },
    [pointCreate.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
})

export default pointsSlice.reducer;
