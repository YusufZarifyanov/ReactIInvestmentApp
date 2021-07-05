import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fakeResponseForEvents as dataEvents } from "../../data/showcase/fakeResponseEvents";
import { v1Axios } from "../../utils/axios";
import { setWarning } from "./modals";
import axios from "axios";

const initialState = {
  news: [],
  loading: false,
  rejected: "",
};

export const fetchNews = createAsyncThunk(
  "events/fetchNews",
  async (_, { dispatch, signal }) => {
    try {
      const source = axios.CancelToken.source();

      signal.addEventListener("abort", () => {
        source.cancel();
      });

      const response = await v1Axios({
        method: "POST",
        url: "/news/v2/list?region=US&snippetCount=28",
        cancelToken: source.token,
      });

      return response.data.data.main.stream;
      // return Promise.reject("xaxaxaxa");
      // return new Promise(function (resolve, reject) {
      //   setTimeout(() => {
      //     resolve(dataEvents.data.main.stream);
      //   }, 1500);
      // });
    } catch (error) {
      if (error.response) {
        console.log("fetchNews error in response", error.response);
        dispatch(setWarning(error.response.data.message));
        return error.response.data;
      } else {
        console.log("fetchNews Error -->", error);
        dispatch(setWarning(error.message));
        return error;
      }
    }
  }
);

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    resetRejectedInEventsSlice(state) {
      state.rejected = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload: news }) => {
        if (!news.message) {
          state.news = news;
        }
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, { error, meta }) => {
        state.loading = false;
        if (!meta.aborted) {
          state.rejected = error.message;
        }
      });
  },
});

export default slice.reducer;
export const { resetRejectedInEventsSlice } = slice.actions;
