import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  mobileSidebar: false
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    updateSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    updateMobileSidebar: (state, action) => {
      state.mobileSidebar = action.payload;
    },
  },
});

export const { updateSidebar, updateMobileSidebar } = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
