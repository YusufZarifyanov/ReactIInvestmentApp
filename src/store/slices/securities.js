import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topViews } from "../../data/showcase/top_views";
import { setWarning } from "./modals";
import {
  convertTimestamp,
  destrucktSecurityArray,
} from "../../utils/helperFunctions";
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
    rejectedWith: "",
  },
  myBriefcase: {
    data: [],
    // review: {},
    loading: false,
  },
  currentSecurity: {
    graph: {},
    meta: [],
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
      // return Promise.reject("fetchUpsDowns rejected");
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
  async (tickersInfo, { dispatch }) => {
    try {
      const securityResponse = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_SECURITIES_URL + tickersInfo.tickers.join(","),
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_SECURITIES_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_SECURITIES_RAPIDAPI_HOST,
          useQueryString: true,
        },
      });
      let showParam;
      if (tickersInfo["tickersLength"]) {
        showParam = destrucktSecurityArray(
          securityResponse.data.quoteResponse.result,
          tickersInfo.tickersLength
        );
      } else {
        showParam = securityResponse.data.quoteResponse.result
      }
      return showParam
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
    resetUpsDownsRejectedWith(state) {
      state.upsDowns.rejectedWith = "";
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
      .addCase(fetchUpsDowns.rejected, (state, { error }) => {
        state.upsDowns.loading = false;
        state.upsDowns.rejectedWith = error.message;
      })
      .addCase(fetchSecurities.pending, (state) => {
        state.myBriefcase.loading = true;
      })
      .addCase(fetchSecurities.fulfilled, (state, action) => {
        if (!action.payload.message) {
          if (!Array.isArray(action.payload)) {
            state.myBriefcase.data = action.payload;
          } else {
            state.currentSecurity.meta = action.payload[0];
          }
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
export const { resetTopViewsRejectedWith, resetUpsDownsRejectedWith } =
  slice.actions;
