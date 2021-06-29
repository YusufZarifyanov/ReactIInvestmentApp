import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topViews } from "../../data/showcase/top_views";
import { setWarning } from "./modals";
import { convertTimestamp } from "../../utils/helperFunctions";
// import { upsDowns } from "../../data/showcase/ups_downs";
import axios from "axios";

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
      //   const response = await axios({
      //     method: 'GET',
      //     url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-popular-watchlists",
      //       headers: {
      //         "x-rapidapi-key":
      //           "f1e65c7abemshcd54427cb794343p12836fjsnc73c0f5b4b4a",
      //         "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      //         useQueryString: true,
      //       },
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
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_UPSDOWNS_URL,
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_UPSDOWNS_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_UPSDOWNS_RAPIDAPI_HOST,
          useQueryString: true,
        },
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
          const securityResponse = await axios({
            method: "GET",
            url:
              process.env.REACT_APP_SECURITIES_URL +
              tickers[securityKey].join(","),
            headers: {
              "x-rapidapi-key": process.env.REACT_APP_SECURITIES_API_KEY,
              "x-rapidapi-host": process.env.REACT_APP_SECURITIES_RAPIDAPI_HOST,
              useQueryString: true,
            },
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
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SECURITY_ITEM_URL}?interval=${queryParams.interval}&symbol=${queryParams.ticker}&range=${queryParams.range}`,
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_SECURITY_ITEM_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_SECURITY_ITEM_RAPIDAPI_HOST,
          useQueryString: true,
        },
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
        if (!topViews.message) {
          state.topViews.main = topViews;
        }
        state.topViews.loading = false;
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
      })
      .addCase(fetchGraph.pending, (state) => {
        state.graph.loading = true;
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

export const { getState } = slice.actions;
export default slice.reducer;
