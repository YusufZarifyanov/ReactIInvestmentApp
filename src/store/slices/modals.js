import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warning: '',
};

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setWarning(state, { payload: warning }) {
      state.warning = warning
    },
    resetWarning(state) {
      state.warning = '';
    }
  },
});

export default slice.reducer;
export const { setWarning, resetWarning } = slice.actions;
