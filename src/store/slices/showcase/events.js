import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fakeResponseForEvents as dataEvents } from '../../../data/showcase/fakeResponseEvents';

const initialState = {
  news: null,
  loading: false,
  error: '',
};

export const fetchNews = createAsyncThunk('events/fetchNews', async () => {
  const response = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=28", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
      "x-rapidapi-key": "cf6ea43f25msh23327306488aa7bp1c5258jsn0b77144eed9b",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
    body: "",
  });

  return await response.json();
  // return dataEvents
});

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default slice.reducer;