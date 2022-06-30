import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CardType } from "../../types";
import {
  cardCreate,
  cardsAllRequest,
  // cardCreate,
  // cardDelete,
  // cardEdit,
} from "../actions";

interface CardsState {
  cards: CardType[];
  isLoading: boolean;
  error: string;
}

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: {
    [cardsAllRequest.fulfilled.type]: (
      state,
      action: PayloadAction<CardType[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.cards = action.payload;
    },
    [cardsAllRequest.pending.type]: (state) => {
      state.isLoading = true;
    },
    [cardsAllRequest.rejected.type]: (
      state,
      action: PayloadAction<AxiosError>
    ) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [cardCreate.fulfilled.type]: (state, action: PayloadAction<CardType>) => {
      state.isLoading = false;
      state.error = "";
      state.cards = [...state.cards, action.payload];
    },
    [cardCreate.pending.type]: (state) => {
      state.isLoading = true;
    },
    [cardCreate.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    // [pointDelete.fulfilled.type]: (state, action: PayloadAction<number>) => {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.cards = state.cards.filter(point => point.id !== action.payload);
    // },
    // [pointDelete.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [pointDelete.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
    //   state.isLoading = false;
    //   state.error = action.payload.message;
    // },
    // [pointEdit.fulfilled.type]: (state, action: PayloadAction<CardType>) => {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.cards = [...state.cards.filter(point => point.id !== action.payload.id), action.payload]
    // },
    // [pointEdit.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [pointEdit.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
    //   state.isLoading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default cardsSlice.reducer;
