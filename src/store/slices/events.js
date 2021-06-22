import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fakeResponseForEvents as dataEvents } from '../../data/showcase/fakeResponseEvents';

const initialState = {
  news: null,
};

export const fetchNews = createAsyncThunk('events/fetchNews', async () => {
  try {
  // const response = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=28", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "text/plain",
  //     "x-rapidapi-key": "f1e65c7abemshcd54427cb794343p12836fjsnc73c0f5b4b4a",
  //     "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  //   },
  //   body: "",
  // });

  // return await response.json();
  return dataEvents
  } catch (error) {
    console.log("error-->", error.message)
  }
});

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload.data.main.stream;
      })
  }
});

export default slice.reducer;