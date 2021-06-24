import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topViews } from "../../data/showcase/top_views";
import { setWarning } from "./modals";
// import { upsDowns } from "../../data/showcase/ups_downs";

const initialState = {
  topViews: {
    main: {
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
    loading: false,
  },
  upsDowns: {
    ups: [],
    downs: [],
    loading: false,
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
    review: {},
    loading: false,
  },
};

export const fetchTopViews = createAsyncThunk(
  "securities/fetchTopViews",
  async (_, { dispatch }) => {
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

      // const result = await response.json();
      // if (result.message) {
      //   dispatch(setWarning(result.message))
      //   return result
      // } else {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(topViews);
        }, 1500);
      });
      // }
    } catch (error) {
      console.log("fetchTopViews error", error.message);
    }
  }
);

export const fetchUpsDowns = createAsyncThunk(
  "securities/fetchUpsDowns",
  async (_, { dispatch }) => {
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

      const result = await response.json();
      if (result.message) {
        dispatch(setWarning(result.message))
        return result
      } else {
        return result.finance.result[0].quotes;
      }
    } catch (error) {
      console.log("fetchUpsDowns error -->", error.message);
    }
  }
);

export const fetchSecurities = createAsyncThunk(
  "securities/fetchOverview",
  async (tickers, { dispatch }) => {
    try {
      const response = await fetch(
        "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
        tickers.join(","),
        {
          headers: {
            "x-rapidapi-key":
              "a70d0b9072msh5b07905beb24538p18761bjsn718f790b01c0",
            "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
            useQueryString: true,
          },
        }
      ).catch((err) => console.log("fetch overview error:", err.message));

      const result = await response.json();
      if (result.message) {
        dispatch(setWarning(result.message))
        return result
      } else {
        return result
      }
    } catch (error) {
      console.log("error-->", error.message);
    }
  }
);

export const fetchAllSecurities = createAsyncThunk(
  "securities/fetchAllSecurities",
  async (securities, { dispatch }) => {
    try {
      const securityObj = {
        currency: [],
        bonds: [],
        shares: [],
        funds: [],
      };
      const keys = Object.keys(securities);
      let result
      for (let securityKey of keys) {
        console.log(securities[securityKey].join(","));
        const response = await fetch(
          "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
          securities[securityKey].join(","),
          {
            headers: {
              "x-rapidapi-key":
                "a70d0b9072msh5b07905beb24538p18761bjsn718f790b01c0",
              "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
              useQueryString: true,
            },
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log("fetch overview error:", err.message));

        securityObj[securityKey] = response;
        result = response
      }

      if (result.message) {
        dispatch(setWarning(result.message))
        return result
      } else {
        return securityObj;
      }
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
      .addCase(fetchTopViews.pending, (state) => {
        state.topViews.loading = true;
      })
      .addCase(fetchTopViews.fulfilled, (state, { payload: topViews }) => {
        if (topViews.message) {
          state.topViews.loading = false;
        } else {
          state.topViews.loading = false;
          state.topViews.main = topViews;
        }
      })
      .addCase(fetchUpsDowns.pending, (state) => {
        state.upsDowns.loading = true;
      })
      .addCase(fetchUpsDowns.fulfilled, (state, { payload: upsDowns }) => {
        if (upsDowns.message) {
          state.upsDowns.loading = false;
        } else {
          state.upsDowns.loading = false;
          state.upsDowns.ups = upsDowns.filter(
            (quote) => quote.regularMarketChangePercent > 0
          );
          state.upsDowns.downs = upsDowns.filter(
            (quote) => quote.regularMarketChangePercent < 0
          );
        }
      })
      .addCase(fetchSecurities.pending, (state) => {
        state.myBriefcase.loading = true;
      })
      .addCase(fetchSecurities.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.myBriefcase.loading = false;
        } else {
          state.myBriefcase.loading = false;
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
        }
      })
      .addCase(fetchAllSecurities.pending, (state) => {
        state.myBriefcase.loading = true;
      })
      .addCase(fetchAllSecurities.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.myBriefcase.loading = false;
        } else {
          state.myBriefcase.loading = false;
          state.myBriefcase.currency.data =
            action.payload.currency.quoteResponse.result;
          state.myBriefcase.bonds.data =
            action.payload.bonds.quoteResponse.result;
          state.myBriefcase.shares.data =
            action.payload.shares.quoteResponse.result;
          state.myBriefcase.funds.data =
            action.payload.funds.quoteResponse.result;
        }
      });
  },
});

export const { getState, changeCurrentSecurity } = slice.actions;
export default slice.reducer;