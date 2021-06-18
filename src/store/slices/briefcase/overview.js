import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
};

const slice = createSlice({
  name: 'briefcase',
  initialState,
  reducers: {
    fetchData(state, action) {
      state.data = action.payload
    },
  },
});

export const { fetchData } = slice.actions;
export default slice.reducer;