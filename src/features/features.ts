import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    updateSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { updateSidebar } = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
