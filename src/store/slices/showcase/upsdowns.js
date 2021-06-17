import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { upsDowns } from "../../../data/showcase/ups_downs";

const initialState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchUpsDowns = createAsyncThunk('upsdowns/fetchUpsDowns', async (tickers) => {
  const response = await fetch(
    "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
    tickers,
    {
      headers: {
        "x-rapidapi-key":
          "cf6ea43f25msh23327306488aa7bp1c5258jsn0b77144eed9b",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
        useQueryString: true,
      },
    }
  )

  return await response.json();
  // return upsDowns
});

const slice = createSlice({
  name: "upsdowns",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUpsDowns.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUpsDowns.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUpsDowns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default slice.reducer;