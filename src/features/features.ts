import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  mobileSidebar: false,
  mobileMenu: false,
  navPage: "home",
  authentication: false,
  dashboardDarkTheme: false,
  colorScheme: "color1",
  smallSidebar: false,
  bettingSlip: "hide",
  websiteColor: "",
  panelMainColor: "",
  panelSecColor: "",
  wallet: 0
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
    updateMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
    updatePageNav: (state, action) => {
      state.navPage = action.payload;
    },
    authenticate: (state, action) => {
      state.authentication = action.payload;
    },
    updateDarkTheme: (state, action) => {
      state.dashboardDarkTheme = action.payload;
    },
    updateColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
    updateSmallsidebar: (state, action) => {
      state.smallSidebar = action.payload;
    },
    updateBettingSlip: (state, action) => {
      state.bettingSlip = action.payload;
    },
    updateWebsiteColor: (state, action) => {
      state.websiteColor = action.payload;
    },
    updatePanelMainColor: (state, action) => {
      state.panelMainColor = action.payload;
    },
    updatePanelSecColor: (state, action) => {
      state.panelSecColor = action.payload;
    },
    updateWallet: (state, action) => {
      state.wallet = action.payload;
    },
  },
});

export const {
  updateSidebar,
  updateMobileSidebar,
  updateMobileMenu,
  updatePageNav,
  authenticate,
  updateDarkTheme,
  updateColorScheme,
  updateSmallsidebar,
  updateBettingSlip,
  updateWebsiteColor,
  updatePanelMainColor,
  updatePanelSecColor,
  updateWallet
} = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
