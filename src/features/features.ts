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
  wallet: 0,
  adminId: "",
  bets: [],
  username: "",
  liveSoccer: [],
  upcomingSoccer: [],
  liveCricket: [],
  upcomingCricket: [],
  redisGames: null,
  token: "",
  dashboardData: {},
  eventData: [],
  selectedEvent: {},
  liveMarkets: {}
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
    updateAdminId: (state, action) => {
      state.adminId = action.payload;
    },
    updateBets: (state, action) => {
      state.bets = action.payload;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateUpcomingSoccer: (state, action) => {
      state.upcomingSoccer = action.payload;
    },
    updateLiveSoccer: (state, action) => {
      state.liveSoccer = action.payload;
    },
    updateLiveCricket: (state, action) => {
      state.liveCricket = action.payload;
    },
    updateUpcomingCricket: (state, action) => {
      state.upcomingCricket = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    updateRedisGamesData: (state, action) => {
      state.redisGames = action.payload;
    },
    updateEventData: (state, action) => {
      state.eventData = action.payload;
    },
    updateSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    updateLiveMarkets: (state, action) => {
      state.liveMarkets = action.payload;
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
  updateWallet,
  updateAdminId,
  updateBets,
  updateUsername,
  updateUpcomingSoccer,
  updateLiveSoccer,
  updateLiveCricket,
  updateUpcomingCricket,
  updateToken,
  updateDashboardData,
  updateRedisGamesData,
  updateEventData,
  updateSelectedEvent,
  updateLiveMarkets
} = featuresSlice.actions;

export const featuresReducer = featuresSlice.reducer;
