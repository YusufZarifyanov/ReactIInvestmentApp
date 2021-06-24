import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topViews } from "../../data/showcase/top_views";
// import { upsDowns } from "../../data/showcase/ups_downs";

const initialState = {
  topViews: [],
  upsDowns: {
    ups: [],
    downs: [],
  },
  myBriefcase: {
    currentSecurity: "currency",
    currency: {
      name: "Валюта",
      tickers: ["AAPL", "IBM"],
      data: [],
    },
    shares: {
      name: "Акции",
      tickers: ["MSFT"],
      data: [],
    },
    bonds: {
      name: "Облигации",
      tickers: ["BABA"],
      data: [],
    },
    funds: {
      name: "Фонды",
      tickers: ["IBM"],
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

export const fetchSecurities = createAsyncThunk(
  "securities/fetchOverview",
  async (tickers) => {
    try {
      const response = await fetch(
        "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
          tickers.join(","),
        {
          headers: {
            "x-rapidapi-key":
              "be36c9998dmsh00baf9ac7578857p108300jsne4f64848085a",
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
  reducers: {
    changeCurrentSecurity(state, action) {
      state.myBriefcase.currentSecurity = action.payload;
    },
    getState(state, action) {
      return {
        ...state,
      };
    },
  },
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
      .addCase(fetchSecurities.fulfilled, (state, action) => {
        // switch (state.myBriefcase.currentSecurity) {
        //   case "currency":
        //     state.myBriefcase.currency.data =
        //       action.payload.quoteResponse.result;
        //   case "bonds":
        //     state.myBriefcase.bonds.data = action.payload.quoteResponse.result;
        //   case "shares":
        //     state.myBriefcase.shares.data = action.payload.quoteResponse.result;
        //   case "funds":
        //     state.myBriefcase.funds.data = action.payload.quoteResponse.result;
        // }
        if (state.myBriefcase.currentSecurity === "currency") {
          state.myBriefcase.currency.data = action.payload.quoteResponse.result;
        }
        if (state.myBriefcase.currentSecurity === "bonds") {
          state.myBriefcase.bonds.data = action.payload.quoteResponse.result;
        }
        if (state.myBriefcase.currentSecurity === "shares") {
          state.myBriefcase.shares.data = action.payload.quoteResponse.result;
        }
        if (state.myBriefcase.currentSecurity === "funds") {
          state.myBriefcase.funds.data = action.payload.quoteResponse.result;
        }
      });
  },
});

export const { getState, changeCurrentSecurity } = slice.actions;

export default slice.reducer;
