import { createSlice } from '@reduxjs/toolkit';
// import { fetchData } from '../slices/briefcase';

// export const submit = () => async (dispatch) => {
//   fetch(
//     ``,
//   )
//     .then((data) => data.json())
//     .then((res) => {
//       dispatch(fetchData(res))
//     })
// }

const initialState = {
    data: null,
};

const slice = createSlice({
  name: 'showcase',
  initialState,
  reducers: {
    fetchData(state, action) {
      state.data = action.payload
    },
  },
});

export const { fetchData } = slice.actions;
export default slice.reducer;