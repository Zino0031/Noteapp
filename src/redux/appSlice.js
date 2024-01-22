import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  },
});

export const { actions, reducer } = appSlice;
export default appSlice.reducer;