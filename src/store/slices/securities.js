import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { topViews } from "../../data/showcase/top_views";

const initialState = {
  topViews: [],
  upsDowns: {
    ups: [],
    downs: [],
  },
  myBriefcase: {
    shares: [
      {
        name: "Audi",
        count: 3,
        cost: 41.92,
        currency: "$",
        src: "https://img.icons8.com/ios/452/audi.png",
        is_active: true,
        value: 11.89,
        ticker: "B"
      },
    ],
    bonds: [
      {
        name: "Audi",
        count: 3,
        cost: 41.92,
        currency: "$",
        src: "https://img.icons8.com/ios/452/audi.png",
        is_active: true,
        value: 11.89,
        ticker: "B"
      },
    ],
  },
};

export const fetchTopViews = createAsyncThunk("securities/fetchTopViews", async () => {
  try {
    //todo:
    // const response = await fetch(
    //   "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-popular-watchlists",
    //   {
    //     headers: {
    //       "x-rapidapi-key":
    //         "f1e65c7abemshcd54427cb794343p12836fjsnc73c0f5b4b4a",
    //       "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    //       useQueryString: true,
    //     },
    //   }
    // )

    // return await response.json();
    return topViews;
  } catch (error) {
    console.log("error-->", error.message)
  }
})

export const fetchUpsDowns = createAsyncThunk("securities/fetchUpsDowns", async () => {
  try {
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
  } catch (error) {
    console.log("error-->", error.message)
  }
})

const slice = createSlice({
  name: "securities",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopViews.fulfilled, (state, action) => {
        state.topViews = action.payload
      })
      .addCase(fetchUpsDowns.fulfilled, (state, action) => {
        state.upsDowns.ups = action.payload.finance.result[0].quotes.filter(quote => quote.regularMarketChangePercent > 0)
        state.upsDowns.downs = action.payload.finance.result[0].quotes.filter(quote => quote.regularMarketChangePercent < 0)
      })
  }
});

export default slice.reducer;