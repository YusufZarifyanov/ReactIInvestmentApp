import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fakeResponseForEvents as dataEvents } from '../../data/showcase/fakeResponseEvents';
import { setWarning } from "./modals";

const initialState = {
  news: [],
  loading: false,
};

export const fetchNews = createAsyncThunk('events/fetchNews', async (_, { dispatch }) => {
  try {
    const response = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=28", {
      method: "POST",
      headers: {
        "content-type": "text/plain",
        "x-rapidapi-key": "f1e65c7abemshcd54427cb794343p12836fjsnc73c0f5b4b4a",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
      body: "",
    });

    const result = await response.json();
    if (result.message) {
      dispatch(setWarning(result.message))
      return result
    } else {
      return result.data.main.stream
    }
    // return new Promise(function (resolve, reject) {
    //   setTimeout(() => {
    //     resolve(dataEvents.data.main.stream);
    //   }, 1500);
    // });
  } catch (error) {
    console.log("fetchNews error-->", error.message)
  }
});

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
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