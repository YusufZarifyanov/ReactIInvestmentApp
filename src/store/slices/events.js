import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fakeResponseForEvents as dataEvents } from '../../data/showcase/fakeResponseEvents';
import { setWarning } from "./modals";
import axios from 'axios';

const initialState = {
  news: [],
  loading: false,
};

export const fetchNews = createAsyncThunk('events/fetchNews', async (_, { dispatch }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_EVENTS_URL}?region=US&snippetCount=28`,
      headers: {
        "content-type": "text/plain",
        "x-rapidapi-key": process.env.REACT_APP_EVENTS_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_EVENTS_RAPIDAPI_HOST,
      }
    });

    return response.data.data.main.stream;
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
      console.log('fetchNews Error -->', error);
      dispatch(setWarning(error.message));
      return error;
    }
  }
});

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: builder => {
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
  }
});

export default slice.reducer;