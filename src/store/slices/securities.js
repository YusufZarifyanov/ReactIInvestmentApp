import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topViews } from "../../data/showcase/top_views";
import { setWarning } from "./modals";
import { convertTimestamp } from "../../utils/helperFunctions";
// import { upsDowns } from "../../data/showcase/ups_downs";
import { v1Axios, lowLatencyAxios } from "../../utils/axios";

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
    rejectedWith: "",
  },
  upsDowns: {
    ups: [],
    downs: [],
    loading: false,
  },
  myBriefcase: {
    data: {
      currency: [],
      shares: [],
      bonds: [],
      funds: [],
    },
    // review: {},
    loading: false,
  },
  currentSecurity: {
    graph: {},
    loading: false,
  },
};

export const fetchTopViews = createAsyncThunk(
  "securities/fetchTopViews",
  async (_, { dispatch }) => {
    try {
      //todo:
      //   const response = await v1Axios({
      //     method: 'GET',
      //     url: "/market/get-popular-watchlists",
      //   });

      //   return response.topViews;
      // } catch (error) {
      //   if (error.response) {
      //     console.log("fetchTopViews error in response", error.response);
      //     dispatch(setWarning(error.response.data.message));
      //     return error.response.data;
      //   } else {
      //     console.log('fetchTopViews Error -->', error);
      //     dispatch(setWarning(error.message));
      //     return error;
      //   }

      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(topViews);
          // reject("fetchTopViews rejected");
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
      const response = await v1Axios({
        method: "GET",
        url: "/market/get-trending-tickers",
      });

      return response.data.finance.result[0].quotes;
    } catch (error) {
      if (error.response) {
        console.log("fetchUpsDowns error in response", error.response);
        dispatch(setWarning(error.response.data.message));
        return error.response.data;
      } else {
        console.log("fetchUpsDowns Error -->", error);
        dispatch(setWarning(error.message));
        return error;
      }
    }
  }
);

export const fetchSecurities = createAsyncThunk(
  "securities/fetchSecurities",
  async (tickers, { dispatch }) => {
    try {
      let response = {};
      const keys = Object.keys(tickers);
      for (let securityKey of keys) {
        if (tickers[securityKey].length <= 0) {
          response[securityKey] = [];
        } else {
          const securityResponse = await lowLatencyAxios({
            method: "GET",
            url: "/v6/finance/quote?symbols=" + tickers[securityKey].join(","),
          });
          response[securityKey] = securityResponse.data.quoteResponse.result;
        }
      }
      return response;
    } catch (error) {
      if (error.response) {
        console.log("fetchSecurities error in response", error.response);
        dispatch(setWarning(error.response.data.message));
        return error.response.data;
      } else {
        console.log("fetchSecurities Error -->", error);
        dispatch(setWarning(error.message));
        return error;
      }
    }
  }
);

export const fetchGraph = createAsyncThunk(
  "securities/fetchGraph",
  async (queryParams, { dispatch }) => {
    try {
      const response = await v1Axios({
        method: "GET",
        url: `/stock/v2/get-chart?interval=${queryParams.interval}&symbol=${queryParams.ticker}&range=${queryParams.range}`,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("fetchGraphData error in response", error.response);
        dispatch(setWarning(error.response.data.message));
        return error.response.data;
      } else {
        console.log("fetchGraphData Error -->", error);
        dispatch(setWarning(error.message));
        return error;
      }
    }
  }
);

const slice = createSlice({
  name: "securities",
  initialState,
  reducers: {
    resetTopViewsRejectedWith(state) {
      state.topViews.rejectedWith = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopViews.pending, (state) => {
        state.topViews.loading = true;
      })
      .addCase(fetchTopViews.fulfilled, (state, { payload: topViews }) => {
        if (!topViews.message) {
          state.topViews.main = topViews;
        }
        state.topViews.loading = false;
      })
      .addCase(fetchTopViews.rejected, (state, { error }) => {
        state.topViews.loading = false;
        state.topViews.rejectedWith = error.message;
      })
      .addCase(fetchUpsDowns.pending, (state) => {
        state.upsDowns.loading = true;
      })
      .addCase(fetchUpsDowns.fulfilled, (state, { payload: upsDowns }) => {
        if (!upsDowns.message) {
          state.upsDowns.ups = upsDowns.filter(
            (quote) => quote.regularMarketChangePercent > 0
          );
          state.upsDowns.downs = upsDowns.filter(
            (quote) => quote.regularMarketChangePercent < 0
          );
        }
        state.upsDowns.loading = false;
      })
      .addCase(fetchSecurities.pending, (state) => {
        state.myBriefcase.loading = true;
      })
      .addCase(fetchSecurities.fulfilled, (state, action) => {
        if (!action.payload.message) {
          state.myBriefcase.data = action.payload;
        }
        state.myBriefcase.loading = false;
      })
      .addCase(fetchGraph.pending, (state) => {
        state.currentSecurity.loading = true;
      })
      .addCase(fetchGraph.fulfilled, (state, action) => {
        if (!action.payload.message) {
          state.currentSecurity.graph = {
            xRange: action.payload.chart.result[0].timestamp.map((el) =>
              convertTimestamp(el)
            ),
            ...action.payload.chart.result[0].indicators.quote[0],
          };
        }
        state.currentSecurity.loading = false;
      });
  },
});

export default slice.reducer;
export const { resetTopViewsRejectedWith } = slice.actions;
