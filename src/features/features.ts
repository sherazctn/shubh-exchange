import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  mobileSidebar: false,
  mobileMenu: false,
  navPage: "home",
  authentication: false,
  dashboardDarkTheme: false,
  colorScheme: "color1",
  smallSidebar: window.innerWidth < 500 ? true : false,
  bettingSlip: "hide",
  websiteColor: "",
  panelMainColor: "",
  panelSecColor: "",
  wallet: 0,
  exposure: 0,
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
  liveMarkets: {},
  slipTab: "slip",
  user: {},
  expCalculation: [],
  pendingBets: [],
  recentExp: {},
  oneTouchEnable: localStorage.getItem('oneTouch') ? true : false,
  trigger: 0,
  sportPermission: {},
  oddRate: { value: 0, type: 'percentage' }
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
    updateExposure: (state, action) => {
      state.exposure = action.payload;
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
    updateSlipTab: (state, action) => {
      state.slipTab = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateExpCalculation: (state, action) => {
      state.expCalculation = action.payload;
    },
    updatePendingBets: (state, action) => {
      state.pendingBets = action.payload;
    },
    updateRecentExp: (state, action) => {
      state.recentExp = action.payload;
    },
    updateOneTouchEnable: (state, action) => {
      state.oneTouchEnable = action.payload
    },
    updateTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    updateSportPermission: (state, action) => {
      state.sportPermission = action.payload;
    },
    updateOddRate: (state, action) => {
      state.oddRate = action.payload;
    }
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
  updateExposure,
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
  updateLiveMarkets,
  updateSlipTab,
  updateUser,
  updateExpCalculation,
  updatePendingBets,
  updateRecentExp,
  updateOneTouchEnable,
  updateTrigger,
  updateSportPermission,
  updateOddRate
} = featuresSlice.actions;

export const featuresReducer = featuresSlice.reducer;
