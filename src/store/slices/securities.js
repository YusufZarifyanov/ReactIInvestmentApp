import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allData: null,
  upsDowns: null,
  topViews: null,
  myBriefcase: null,
};

export const fetchSecurities = createAsyncThunk("securities/fetchSecurities", async tickers => {
  // const response = await fetch(
  //   "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
  //   tickers,
  //   {
  //     headers: {
  //       "x-rapidapi-key":
  //         "cf6ea43f25msh23327306488aa7bp1c5258jsn0b77144eed9b",
  //       "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
  //       useQueryString: true,
  //     },
  //   }
  // )

  // return await response.json();
})

export const fetchUpsDowns = createAsyncThunk("securities/fetchUpsDowns", async () => {
  const response = await fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers",
    {
      headers: {
        "x-rapidapi-key":
          "f1e65c7abemshcd54427cb794343p12836fjsnc73c0f5b4b4a",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        useQueryString: true,
      },
    }
  )

  return await response.json();
})

export const fetchTopViews = createAsyncThunk("securities/fetchTopViews", async () => {
  const response = await fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-popular-watchlists",
    {
      headers: {
        "x-rapidapi-key":
          "f1e65c7abemshcd54427cb794343p12836fjsnc73c0f5b4b4a",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        useQueryString: true,
      },
    }
  )

  return await response.json();
})

const slice = createSlice({
  name: "securities",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSecurities.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(fetchUpsDowns.fulfilled, (state, action) => {
        state.upsDowns = action.payload
      })
      .addCase(fetchTopViews.fulfilled, (state, action) => {
        state.topViews = action.payload
      })
  }
});

export default slice.reducer;