import { createSlice } from '@reduxjs/toolkit';

const savedItemSlice = createSlice({
  name: 'savedItems',
  initialState: {
    items: [],
  },
  reducers: {
    setSavedItems: (state, action) => {
      const { items } = action.payload;
      if (items) {
        state.items = items;
      }
    },
  },
});

export const { setSavedItems } = savedItemSlice.actions;
export default savedItemSlice.reducer;
