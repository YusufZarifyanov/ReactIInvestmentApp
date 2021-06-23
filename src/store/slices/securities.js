import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topViews } from "../../data/showcase/top_views";
// import { upsDowns } from "../../data/showcase/ups_downs";

const initialState = {
  overview: [],
  topViews: [],
  upsDowns: {
    ups: [],
    downs: [],
  },
  myBriefcase: {
    currency: {
      name: "Валюта",
      data: [],
    },
    shares: {
      name: "Акции",
      data: [],
    },
    bonds: {
      name: "Облигации",
      data: [],
    },
    funds: {
      name: "Фонды",
      data: [],
    },
  },
};

export const fetchTopViews = createAsyncThunk(
  "securities/fetchTopViews",
  async () => {
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
      console.log("fetchTopViews error", error.message);
    }
  }
);

export const fetchUpsDowns = createAsyncThunk(
  "securities/fetchUpsDowns",
  async () => {
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
      );

      return await response.json();
    } catch (error) {
      console.log("fetchUpsDowns error", error.message);
    }
  }
);

export const fetchOverview = createAsyncThunk(
  "securities/fetchOverview",
  async (stringTickers) => {
    try {
      // const tickerString = "IBM";
      const response = await fetch(
        "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" + stringTickers,
        {
          headers: {
            "x-rapidapi-key":
              "ac7b597b45mshb7a6a40f5c1ead9p131c54jsn7802703f73cf",
            "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
            useQueryString: true,
          },
        }
      ).catch((err) => console.log("fetch overview error:", err.message));
      return await response.json();
    } catch (error) {
      console.log("error-->", error.message);
    }
  }
);

const slice = createSlice({
  name: "securities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopViews.fulfilled, (state, action) => {
        state.topViews = action.payload;
      })
      .addCase(fetchUpsDowns.fulfilled, (state, action) => {
        state.upsDowns.ups = action.payload.finance.result[0].quotes.filter(
          (quote) => quote.regularMarketChangePercent > 0
        );
        state.upsDowns.downs = action.payload.finance.result[0].quotes.filter(
          (quote) => quote.regularMarketChangePercent < 0
        );
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.overview = action.payload.quoteResponse.result;
      });
  },
});

export default slice.reducer;
