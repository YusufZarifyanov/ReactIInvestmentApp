import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
};

export const fetchData = createAsyncThunk('upsdowns/fetchData', async () => {
  // const response = await lalala
  // return response.todos
});

const slice = createSlice({
  name: "upsdowns",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
  }
});

export default slice.reducer;