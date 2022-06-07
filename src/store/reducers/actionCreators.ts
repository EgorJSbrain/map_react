import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, thunkApi) => {
    const res = await axios.get('http://localhost:3008/profile');
    return res.data
  }
)